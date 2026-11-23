-- Run this ONLY if you already ran the old schema.sql
alter table orders add column if not exists email text;
drop function if exists place_order(text,text,text,text,text,jsonb);
create function place_order(p_name text,p_phone text,p_email text,p_address text,p_city text,p_notes text,p_items jsonb) returns text language plpgsql security definer as $$
declare v_no text:='AQC-'||to_char(now(),'YYMMDD')||'-'||lpad((floor(random()*9000)+1000)::text,4,'0'); v_total int; v_items jsonb;
begin
 select sum(p.price*(i->>'qty')::int),jsonb_agg(jsonb_build_object('name',p.name,'price',p.price,'qty',(i->>'qty')::int)) into v_total,v_items
 from jsonb_array_elements(p_items) i join products p on p.id=(i->>'id')::uuid and p.active;
 if v_total is null then raise exception 'empty order'; end if;
 insert into orders(order_no,name,phone,email,address,city,notes,items,total) values(v_no,p_name,p_phone,p_email,p_address,p_city,p_notes,v_items,v_total);
 return v_no;
end $$;
grant execute on function place_order to anon,authenticated;
