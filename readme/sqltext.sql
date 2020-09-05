use myBlog; -- 使用myBlog数据库

-- show tables; 展示所有的表
-- insert into users (username, `password`, realname) values ("boye", 'zbh123456', '博烨'); 在users表里面新增一个用户信息
-- 上面的 password 要``，因为password是一个关键字。

select * from users; -- 查询users表里面所有的数据，* 表示所有

select id, username from users; -- 只查询users表里面id和username的信息

select * from users where password like '%zbh%'; -- where 查询条件是password字段，like表示模糊查询， 后面%%表示模糊查询的条件

select * from users where password like '%12%' ORDER BY id desc; -- order by id desc: 表示查询后根据 id 的值排序，如果有desc关键字就是倒序，没有就是正序