TRUNCATE TABLE posts RESTART IDENTITY;

INSERT INTO posts (title, posted_at, duration, content, likes, comments, category, url)
VALUES
('Pass áo khoác size M - mới 95%', now() - interval '2 day', '2 ngày', 'Áo khoác màu đen, size M, form ôm, ít mặc nên pass lại cho bạn nào cần. Có túi trong rộng, rất ấm áp mùa đông.', 120, 15, 'áo khoác', 'https://facebook.com/abc'),
('Pass giày Nike 42', now() - interval '5 hour', '5 giờ', 'Giày Nike chính hãng, gần như mới, đi 3 lần. Fullbox kèm hoá đơn Vincom. Pass nhanh cho bạn nào cần luyện tập.', 230, 40, 'giày', 'https://facebook.com/def'),
('Pass túi xách Chanel', now() - interval '10 day', '10 ngày', 'Túi xách hàng xách tay, zip full, còn thẻ bảo hành. Tông màu be dễ phối đồ. Giá tốt cho chị em yêu thích hàng hiệu.', 55, 6, 'túi xách', 'https://facebook.com/ghi'),
('Pass quần jean nam Uniqlo', now() - interval '3 day', '3 ngày', 'Quần jean Uniqlo màu xanh đậm, size 31. Mặc đúng 2 lần, không rách, không phai. Tặng kèm dây nịt da.', 98, 12, 'quần jean', 'https://facebook.com/jkl'),
('Pass đồng hồ Casio vintage', now() - interval '7 day', '7 ngày', 'Đồng hồ Casio retro bản vàng, pin mới thay, có hộp. Phù hợp phối đồ vintage. Hỗ trợ ship toàn quốc.', 180, 22, 'phụ kiện', 'https://facebook.com/mno'),
('Pass laptop Dell XPS 13', now() - interval '15 hour', '15 giờ', 'Dell XPS 13 2021, i7, RAM 16GB, SSD 512GB. Máy đẹp 99%, còn bảo hành chính hãng 6 tháng. Bao test thoải mái.', 320, 65, 'điện tử', 'https://facebook.com/pqr');
