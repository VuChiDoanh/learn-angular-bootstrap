window.BookingController = function ($scope, $http) {

    let apiUrl = "https://doanh-learn-api.onrender.com/booking";
    $scope.getData = function () {
        $http.get(apiUrl).then(function (response) {
            console.log(response)
            if (response.status == 200) {
                $scope.danhsach = response.data;
            }
        })
    }
    $scope.getData();

    $scope.hanhli = "1Kg";
    $scope.loaiphong = "Phòng Standard (STD)";
    $scope.title = 'Booking'
    $scope.kiemTra = {
        ten: false,
        cccd: false,
        email: false,
        phone: false,
        ngaysinh: false,
        gioitinh: false,
        checkin: false,
        checkout: false,
    }

    $scope.onClose = function () {
        $scope.ten = "";
        $scope.cccd = "";
        $scope.email = "";
        $scope.phone = "";
        $scope.ngaysinh = "";
        $scope.gioitinh = "Nam";
        $scope.checkin = "";
        $scope.checkout = "";
        $scope.hanhli = "1Kg";
        $scope.loaiphong = "Phòng Standard (STD)";
        $scope.editId = 0;
    };
    $scope.submit = function () {
        let flag = true;
        if (!$scope.ten) {
            $scope.kiemTra.ten = true;
            flag = false
        } else {
            $scope.kiemTra.ten = false;
        }

        if (!$scope.cccd || !/^[0-9]{9,12}$/.test($scope.cccd)) { 
            $scope.kiemTra.cccd = true;
            flag = false

        } else {
            $scope.kiemTra.cccd = false;
        }

        if (!$scope.email || !$scope.validateEmail($scope.email)) {
            $scope.kiemTra.email = true;
            flag = false

        } else {
            $scope.kiemTra.email = false;
        }

        if (!$scope.phone || !/^(0\d{9}|0\d{3}[\s-]\d{3}[\s-]\d{3})$/.test($scope.phone)) {
            $scope.kiemTra.phone = true;
            flag = false

        } else {
            $scope.kiemTra.phone = false;
        }

        if (!$scope.checkin) {
            $scope.kiemTra.checkin = true;
            flag = false

        } else {
            $scope.kiemTra.checkin = false;
        }

        if (!$scope.checkout) {
            $scope.kiemTra.checkout = true;
            flag = false

        } else {
            $scope.kiemTra.checkout = false;
        }

        if (!$scope.gioitinh) {
            $scope.kiemTra.gioitinh = true;
            flag = false

        } else {
            $scope.kiemTra.gioitinh = false;
        }

        if (!$scope.ngaysinh) {
            $scope.kiemTra.ngaysinh = true;
            flag = false

        } else {
            $scope.kiemTra.ngaysinh = false;
        }

        if (flag) {
            let editId = $scope.editId;
            
            if (editId) {

                let updateItem = {
                    ten: $scope.ten,
                    cccd: $scope.cccd,
                    email: $scope.email,
                    phone: $scope.phone,
                    ngaysinh: $scope.ngaysinh.toLocaleDateString('vi-VN'),
                    gioitinh: $scope.gioitinh,
                    checkin: $scope.checkin.toLocaleString(),
                    checkout: $scope.checkout.toLocaleString(),
                    loaiphong: $scope.loaiphong, 
                    hanhli: $scope.hanhli 
                }
                $http.put(
                    `${apiUrl}/${editId}`,
                    updateItem
                ).then(function(response){
                    if(response.status==200){
                        $scope.getData();
                    }
                })
                $scope.onClose();
                return;
            }
            let newItem = {
                ten: $scope.ten,
                cccd: $scope.cccd,
                email: $scope.email,
                phone: $scope.phone,
                ngaysinh: $scope.ngaysinh.toLocaleDateString('vi-VN'),
                gioitinh: $scope.gioitinh,
                checkin:$scope.checkin.toLocaleString(),
                checkout: $scope.checkout.toLocaleString(),
                loaiphong: $scope.loaiphong, //Thêm dòng này
                hanhli: $scope.hanhli, //Thêm dòng này
            }
            $http.post(
                apiUrl,
                newItem,
            ).then(function(response){
                console.log(response);
            })
            
        }

    }
    $scope.onEdit = function (editId) {
        $scope.editId = editId;
        $http.get(`${apiUrl}/${editId}`).then(function (response) {
            if (response.status == 200) {
                $scope.ten = response.data.ten;
                $scope.cccd = response.data.cccd;
                $scope.email = response.data.email;
                $scope.phone = response.data.phone;
                $scope.ngaysinh = new Date(response.data.ngaysinh);
                $scope.gioitinh = response.data.gioitinh;
                $scope.checkin = new Date(response.data.checkin); 
                $scope.checkout = new Date(response.data.checkout);
                $scope.hanhli = response.data.hanhli;
                $scope.loaiphong = response.data.loaiphong;
            }
        });
    };

    $scope.onDelete = function (deleteId) {
        let confirm = window.confirm('Bạn có chắc muốn xóa không?');
        if (confirm) {
            $http.delete(
                `${apiUrl}/${deleteId}`
            ).then(function (response) {
                if (response.status == 200) {
                    $scope.getData();
                }
            });
        }
    };
    $scope.validateEmail = function (email) {
        var pattern = /^\w+@\w+.\w{2,7}.\w{2,5}$/;
        return pattern.test(email);
    };
}
