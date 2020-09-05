use myBlog; -- 使用myBlog数据库

-- show tables; 展示所有的表
-- insert into users (username, `password`, realname) values ("boye", 'zbh123456', '博烨'); 在users表里面新增一个用户信息
-- 上面的 password 要``，因为password是一个关键字。

-- select * from users; -- 查询users表里面所有的数据，* 表示所有

-- select id, username from users; -- 只查询users表里面id和username的信息

-- select * from users where password like '%zbh%'; -- where 查询条件是password字段，like表示模糊查询， 后面%%表示模糊查询的条件

-- select * from users where password like '%12%' ORDER BY id desc; -- order by id desc: 表示查询后根据 id 的值排序，如果有desc关键字就是倒序，没有就是正序

-- SET SQL_SAFE_UPDATES=0; -- 重置安全模式

-- update users set realname='李四2' where username = 'lisi'; --  更新将 username 为 lisi 的数据中的 realname 改成 李四2


-- delete from users where username='lisi'; -- 删除用户名为lisi的数据

-- 实际工作中，我们不会直接去 delete 某个数据。而是使用update 去更新这个数据的状态，state的值，在使用中的数据 state的值为 1， 删除的时候将它改为0

-- 我们将删除的李四新增回去，用上面说的方法再删除一次

-- insert into users (username, `password`, realname) values ('lisi', '123', '李四');

-- 修改李四的state值，达到删除的效果

-- update users set state=0 where username='lisi'; -- 将李四这个用户state修改成0

-- 再查只有state=1 的数据，就能过滤掉state=0被删除的数据了，这叫软删除，可以通过update进行恢复

-- select * from users where state = 1; -- 也可以设置成 state <> 0,就是不等于0的意思

-- select version(); -- 查询mysql的版本号

-- 为blogs表新增测试数据

-- insert into blogs (title, content, createtime, author) values ('标题A', '内容A', 1599320843742, 'lisi');
-- insert into blogs (title, content, createtime, author) values ('标题B', '内容B', 1599320915973, 'zhansan');

select * from blogs;
select * from users;