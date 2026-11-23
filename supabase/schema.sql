create table products(id uuid primary key default gen_random_uuid(),slug text unique not null,name text not null,description text,price int not null,unit text default 'per dozen',image_url text,stock int default 100,active boolean default true,created_at timestamptz default now());
create table orders(id uuid primary key default gen_random_uuid(),order_no text unique not null,name text,phone text,email text,address text,city text,notes text,items jsonb,total int,status text default 'Pending',courier text,tracking_no text,tracking_note text,created_at timestamptz default now(),updated_at timestamptz default now());
create table admins(email text primary key);
alter table products enable row level security;
alter table orders enable row level security;
alter table admins enable row level security;
create function is_admin() returns boolean language sql security definer stable as $$ select exists(select 1 from admins where email=auth.jwt()->>'email') $$;
create policy "read products" on products for select using(active or is_admin());
create policy "admin products" on products for all using(is_admin()) with check(is_admin());
create policy "admin orders" on orders for all using(is_admin()) with check(is_admin());
create function place_order(p_name text,p_phone text,p_email text,p_address text,p_city text,p_notes text,p_items jsonb) returns text language plpgsql security definer as $$
declare v_no text:='AQC-'||to_char(now(),'YYMMDD')||'-'||lpad((floor(random()*9000)+1000)::text,4,'0'); v_total int; v_items jsonb;
begin
 select sum(p.price*(i->>'qty')::int),jsonb_agg(jsonb_build_object('name',p.name,'price',p.price,'qty',(i->>'qty')::int)) into v_total,v_items
 from jsonb_array_elements(p_items) i join products p on p.id=(i->>'id')::uuid and p.active;
 if v_total is null then raise exception 'empty order'; end if;
 insert into orders(order_no,name,phone,email,address,city,notes,items,total) values(v_no,p_name,p_phone,p_email,p_address,p_city,p_notes,v_items,v_total);
 return v_no;
end $$;
create function track_order(p_no text,p_phone text) returns table(order_no text,status text,courier text,tracking_no text,tracking_note text,total int,items jsonb,updated_at timestamptz) language sql security definer as $$ select o.order_no,o.status,o.courier,o.tracking_no,o.tracking_note,o.total,o.items,o.updated_at from orders o where o.order_no=p_no and o.phone=p_phone $$;
grant execute on function place_order,track_order to anon,authenticated;
insert into storage.buckets(id,name,public) values('products','products',true);
create policy "public img" on storage.objects for select using(bucket_id='products');
create policy "admin img" on storage.objects for all using(bucket_id='products' and is_admin()) with check(bucket_id='products' and is_admin());
-- After creating your admin user in Supabase Auth, run: insert into admins values('your@email.com');
