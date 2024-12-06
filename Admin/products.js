// Kiểm tra xem dữ liệu sản phẩm đã có trong localStorage chưa
let products = JSON.parse(localStorage.getItem('products'));

// Nếu chưa có dữ liệu trong localStorage => thì gán giá trị mặc định
if (!products) {
    products = [
        {
            id: 1,
            name: 'Ô Long Mận Mộc Châu Thạch Quế Hoa',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Mứt mận Mộc Châu vị chua ngọt thưởng thức cùng thạch quế hoa thanh mát tạo nên món nước cuốn hút' ,
            image: '../image/products/FreshFruitTea/O-Long-Man-Moc-Chau-Thach-Que-Hoa.jpg',
            isDelete: false
        },
        {
            id: 2,
            name: 'Ô Long Tuyết Lê Khổng Lồ',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Topping lê tươi giòn ngọt cùng tuyết nhĩ sần sật, thưởng thức cùng trà ô lông khói vô cùng thanh lọc, bổ dưỡng' ,
            image: '../image/products/FreshFruitTea/O-Long-Tuyet-Le-Khong-Lo.jpg',
            isDelete: false
        },
        {
            id: 3,
            name: 'Trà Chanh Mật ong Giã Tay Khổng Lồ',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Vị chua nhẹ từ chanh vàng được giã bằng tay kết hợp với trà xanh lài cùng mật ong tự nhiên ngọt thanh. Có sẵn topping thạch băng tuyết' ,
            image: '../image/products/FreshFruitTea/Tra-Chanh-Mat-Ong-Gia-Tay-Khong-Lo.jpg',
            isDelete: false
        },
        {
            id: 4,
            name: 'Trà Chanh Mật Ong Giã Tay',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Vị chua nhẹ từ chanh vàng được giã bằng tay kết hợp với trà xanh lài cùng mật ong tự nhiên ngọt thanh. Có sẵn topping thạch băng tuyết' ,
            image: '../image/products/FreshFruitTea/Tra-Chanh-Mat-Ong-Gia-Tay.jpg',
            isDelete: false
        },
        {
            id: 5,
            name: 'Trà Đào Tiên Quế Hoa',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Hồng trà đào đậm vị, topping đào tiên mà hồng giòn ngọt tự nhiên kết hợp cùng thạch quế hoa mềm mướt. Thức uống thanh mát sảng khoái đặc biệt cho mùa hè' ,
            image: '../image/products/FreshFruitTea/Tra-Dao-Tien-Que-Hoa.png',
            isDelete: false
        },
        {
            id: 6,
            name: 'Trà Dâu Tầm Pha Lê Tuyết',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Mứt dâu tầm chua chua ngọt ngọt hòa cùng vị trà chát nhẹ, kết hợp với topping thạch băng tuyết tạo nên thức uống giải khát tuyệt vời' ,
            image: '../image/products/FreshFruitTea/Tra-Dau-Tam-Pha-Le-Tuyet.jpg',
            isDelete: false
        },
        {
            id: 7,
            name: 'Trà Dứa Thạch Konjac',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Hương vị đậm đà, chua ngọt hài hòa đặc trưng của mứt dứa kết hợp với vị trà xanh nhài thanh mát, topping thạch Konjac giòn giòn vui miệng' ,
            image: '../image/products/FreshFruitTea/Tra-Dua-Thach-Konjac.jpg',
            isDelete: false
        },
        {
            id: 8,
            name: 'Trà Xanh Nhài Đào Tiên',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'FreshFruitTea',
            describe: 'Trà xanh nhài thoảng hương hoa nhài, topping đào tiên má hồng giòn ngọt tự nhiên kết hợp cùng thạch quế hoa mềm mướt. Thức uống thanh mát sảng khoái đặc biệt cho mùa hè' ,
            image: '../image/products/FreshFruitTea/Tra-Xanh-Nhai-Dao-Tien.png',
            isDelete: false
        },
        {
            id: 9,
            name: 'Cà Phê Kem Trân Châu Hoàng Kim',
            sizes: [
                { size: 'M', price: 15000 },
                { size: 'L', price: 20000 }
            ],
            type: 'Ice',
            describe: 'SẢN PHẨM NGON HƠN KHI THƯỞNG THỨC TẠI CỬA HÀNG' ,
            image: '../image/products/Ice/Ca-Phe-Kem-Tran-Chan-Hoang-Kim.jpg',
            isDelete: false
        },
        {
            id: 10,
            name: 'Kem Ly Vani Dâu',
            sizes: [
                { size: 'M', price: 15000 },
                { size: 'L', price: 20000 }
            ],
            type: 'Ice',
            describe: 'SẢN PHẨM NGON HƠN KHI THƯỞNG THỨC TẠI CỬA HÀNG' ,
            image: '../image/products/Ice/Kem-Ly-Vani-Dau.jpg',
            isDelete: false
        },
        {
            id: 11,
            name: 'Kem Trà Sữa Trân Châu Hoàng Kim',
            sizes: [
                { size: 'M', price: 15000 },
                { size: 'L', price: 20000 }
            ],
            type: 'Ice',
            describe: 'Kem thơm vị hồng trà, hương caramel của đường đen cùng chút ngậy béo từ sữa, thưởng thức cùng trân châu hoàng kim dẻo dai, độc đáo' ,
            image: '../image/products/Ice/Kem-Tra-Sua-Tran-Chau-Hoang-Kim.png',
            isDelete: false
        },
        {
            id: 12,
            name: 'Kem Trân Châu Hoàng Kim',
            sizes: [
                { size: 'M', price: 15000 },
                { size: 'L', price: 20000 }
            ],
            type: 'Ice',
            describe: 'SẢN PHẨM NGON HƠN KHI THƯỞNG THỨC TẠI CỬA HÀNG' ,
            image: '../image/products/Ice/Kem-Tran-Chau-Hoang-Kim.jpg',
            isDelete: false
        },
        {
            id: 13,
            name: 'Kem Vani Trà Sữa Trân Châu Hoàng Kim',
            sizes: [
                { size: 'M', price: 15000 },
                { size: 'L', price: 20000 }
            ],
            type: 'Ice',
            describe: 'Sự hòa quyện của hương thơm trà sữa đậm đà cùng vị vani béo ngậy, kết hợp với trân châu hoàng kim dẻo dai, ngọt ngọt' ,
            image: '../image/products/Ice/Kem-Vani-Tra-Sua-Tran-Chau-Hoang-Kim.png',
            isDelete: false
        },
        {
            id: 14,
            name: 'Người Bạn Xanh Sữa Nhài Khổng Lồ',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Trà xanh hoa nhài đậm vị kết hợp với 4 loại topping: Trân châu hoàng kim, trân châu sợi, thạch quế hoa, thạch konjac thơm ngon sảng khoái' ,
            image: '../image/products/Milktea/Nguoi-Ban-Xanh-Sua-Nhai-Khong-Lo.jpg',
            isDelete: false
        },
        {
            id: 15,
            name: 'Ô Long Sữa Tươi Trân Châu Ngũ Cốc',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Trà sữa ô long khói thanh nhiệt thơm béo, topping trân châu ngũ cốc dẻo bùi được làm từ khoai lang Đà Lạt' ,
            image: '../image/products/Milktea/O-Long-Sua-Tuoi-Tran-Chau-Ngu-Coc.jpg',
            isDelete: false
        },
        {
            id: 16,
            name: 'Sữa Tươi Trân Châu Đường Hổ Khổng Lồ',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Sữa tươi nguyên kem thơm béo, có sẵn topping trân châu hoàng kim dẻo dai mang lại trải nghiệm thú vị hấp dẫn' ,
            image: '../image/products/Milktea/Sua-Tuoi-Tran-Chau-Duong-Ho-Khong-Lo.jpg',
            isDelete: false
        },
        {
            id: 17,
            name: 'Tiger Sugar',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Sữa tươi nguyên kem thơm béo, có sẵn topping trân châu hoàng kim dẻo dai mang lại trải nghiệm thú vị hấp dẫn' ,
            image: '../image/products/Milktea/Tiger-Sugar.jpg',
            isDelete: false
        },
        {
            id: 18,
            name: 'Trà Sữa Ba Anh Em',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Vị trà sữa thơm béo đậm đà đặc trưng với 3 loại topping: pudding phô mai tươi dẻo thơm, topping trân châu sợi và chân trâu hoàng kim dẻo dai kích thích vị giác' ,
            image: '../image/products/Milktea/Tra-Sua-Ba-Anh-Em.jpg',
            isDelete: false
        },
        {
            id: 19,
            name: 'Trà Sữa BoBa Cheese',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Boba cheese được làm từ phô mai con bò cười, mang đến trải nghiệm mềm trong dai ngoài hòa cùng vị trà sữa thơm béo' ,
            image: '../image/products/Milktea/Tra-Sua-BoBa-Cheese.png',
            isDelete: false
        },
        {
            id: 20,
            name: 'Trà Sữa Dâu Tây',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Hương vị chua ngọt hài hòa đặc trưng của dâu tây và trà thanh mát' ,
            image: '../image/products/Milktea/Tra-Sua-Dau-Tay.jpg',
            isDelete: false
        },
        {
            id: 21,
            name: 'Trà Sữa Ô Long',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Trà ô long đậm vị kết hợp với sữa thơm béo, độ ngọt vừa phải' ,
            image: '../image/products/Milktea/Tra-Sua-O-Long.jpg',
            isDelete: false
        },
        {
            id: 22,
            name: 'Trà Sữa Okinawa',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Sự ngọt thanh kết hợp trân châu giòn khiến ta cảm tháy thú vị' ,
            image: '../image/products/Milktea/Tra-Sua-Okinawa.png',
            isDelete: false
        },
        {
            id: 23,
            name: 'Trà Sữa Phô Mai Tươi',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Hồng trà đậm đà hòa cùng sữa béo béo, kết hợp pudding phô mai tươi thơm thơm, vừa dẻo lại vừa mịn kích thích vị giác' ,
            image: '../image/products/Milktea/Tra-Sua-Pho-Mai-Tuoi.png',
            isDelete: false
        },
        {
            id: 24,
            name: 'Trà Sữa Socola',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Hương thơm socola đậm đà hòa cùng vị trà sữa ngọt ngào, béo ngậy' ,
            image: '../image/products/Milktea/Tra-Sua-Socola.jpg',
            isDelete: false
        },
        {
            id: 25,
            name: 'Trà Sữa Trân Châu Đường Đen',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Hương thơm socola đậm đà hòa cùng vị trà sữa ngọt ngào, béo ngậy' ,
            image: '../image/products/Milktea/Tra-Sua-Tran-Chau-Duong-Den.jpg',
            isDelete: false
        },
        {
            id: 26,
            name: 'Trà Sữa Trân Châu Hoàng Gia',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Hương vị trà sữa thơm béo cùng hương thơm đặc trưng của hồng trà kết hợp với trân châu được tẩm với mật ong nguyên chất tạo ra hương vị ngọt ngào đặc trưng' ,
            image: '../image/products/Milktea/Tra-Sua-Tran-Chau-Hoang-Gia.jpg',
            isDelete: false
        },
        {
            id: 27,
            name: 'Trà Sữa Trân Châu Sợi',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: 'Hương hoa nhài thanh mát cùng với hương vị đặc trưng của lá trà xanh kết hợp với độ dẻo dai của trân châu sợi tạo trải nghiệm thú vị' ,
            image: '../image/products/Milktea/Tra-Sua-Tran-Chau-Soi.jpg',
            isDelete: false
        },
        {
            id: 28,
            name: 'Trà Sữa',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: '' ,
            image: '../image/products/Milktea/Tra-Sua.jpg',
            isDelete: false
        },
        {
            id: 29,
            name: 'Trà Xanh Sữa Vị Nhài',
            sizes: [
                { size: 'M', price: 35000 },
                { size: 'L', price: 43000 }
            ],
            type: 'MilkTea',
            describe: '' ,
            image: '../image/products/Milktea/Tra-Xanh-Sua-Vi-Nhai.jpg',
            isDelete: false
        },

    
    ]
    // Lưu dữ liệu mặc định vào localStorage
    localStorage.setItem('products', JSON.stringify(products));
}
