
class User {
    constructor(userName, userSurname, userAge, userGender, userLicence) {
        this.userId = UserList.length + 1;
        this.userName = userName;
        this.userSurname = userSurname;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userLicence = userLicence;
        this.userStatus = true;
    }
}
class Car {
    constructor(carBrand, carColor, carPrice) {
        this.carId = CarList.length + 1;
        this.carBrand = carBrand;
        this.carColor = carColor;
        this.carPrice = carPrice;
        this.carStatus = true;
    }
}

class RentCar {
    constructor(userId, carId, rentedTime, carPrice) {
        this.Id = RentList.length + 1;
        this.userId = userId;
        this.carId = carId;
        this.rentedTime = rentedTime;
        this.totalPrice = carPrice * rentedTime;
    }
}

const UserList = [];
const CarList = [];
const RentList = [];

function addUser() {
    const userName = document.getElementById("userName").value;
    const userSurname = document.getElementById("userSurname").value;
    const userAge = document.getElementById("userAge").value;
    const userGender = document.getElementById("userGender").value;
    const userLicence = document.getElementById("userLicence").value;


    const user = new User(userName, userSurname, userAge, userGender, userLicence);
    UserList.push(user);
    document.getElementById("userName").value = "";
    document.getElementById("userSurname").value = "";
    document.getElementById("userAge").value = "";
    document.getElementById("userGender").value = "";
    document.getElementById("userLicence").value = "";

    userUpdate();
}

function addCar() {
    const carBrand = document.getElementById("carBrand").value.trim();
    const carColor = document.getElementById("carColor").value.trim();
    const carPrice = document.getElementById("carPrice").value.trim();

    if (
        carPrice <= 0
    ) {
        alert("Kiralama bedeli hatalı girildi");
        return;
    }
    if (
        carBrand == "" ||
        carColor == ""
    ) {
        alert("Boş geçilemez");
        return;
    }

    const car = new Car(carBrand, carColor, carPrice);
    CarList.push(car);

    document.getElementById("carBrand").value = "";
    document.getElementById("carColor").value = "";
    document.getElementById("carPrice").value = "";

    userUpdate();
}

function rentCar() {
    const rentUser = document.getElementById("selectUser").value;
    const rentCar = document.getElementById("selectCar").value;
    const rentedTime = document.getElementById("rentedTime").value.trim();

    const usr = UserList.find((user) => user.userName + " " + user.userSurname == rentUser)
    const car = CarList.find((car) => car.carBrand == rentCar)
    

    const rent = new RentCar(rentUser, rentCar, rentedTime, car.carPrice);
    
    if(usr.userStatus == false){
        alert("Zaten üzerinize kayıtlı bir araba mevcut")
    }
    else if(car.carStatus == false){
        alert("Bu araba başkasına kayıtlı")
    }
    else if(usr.userLicence == "Yok"){
        alert("Ehiyetiniz olmadığı için araç alamazsınız")
    }
    else{
        RentList.push(rent);
        usr.userStatus = false;
        car.carStatus = false;
    }
    
    
    document.getElementById("selectUser").value = "";
    document.getElementById("selectCar").value = "";
    document.getElementById("rentedTime").value = "";

    userUpdate();
}

function userUpdate() {
    const userName = document.getElementById("userName");
    const userSurname = document.getElementById("userSurname");
    const userAge = document.getElementById("userAge");
    const userGender = document.getElementById("userGender");
    const userLicence = document.getElementById("userLicence");


    selectUser.innerHTML = `<option disabled value selected> -- Select User --</option>`;

    UserList.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.userName + " " + user.userSurname;
        option.innerText = user.userName + " " + user.userSurname;

        selectUser.add(option);
    });

    const CustomerList = document.getElementById("UserList");
    CustomerList.innerHTML = "";
    UserList.forEach((user) => {
        const tr = document.createElement("tr");
        const userIdTd = document.createElement("td");
        const userNameTd = document.createElement("td");
        const userSurnameTd = document.createElement("td");
        const userAgeTd = document.createElement("td");
        const userGenderTd = document.createElement("td");
        const userLicenceTd = document.createElement("td");
        const thbtn = document.createElement("th");

        const DeleteUserButton = document.createElement("button");
        DeleteUserButton.innerText = "Delete User";
        DeleteUserButton.className = "btn btn-danger";

        DeleteUserButton.addEventListener("click", () => {
            deleteUser(user.userId);
        });
        userIdTd.innerText = user.userId;
        userNameTd.innerText = user.userName;
        userSurnameTd.innerText = user.userSurname;
        userAgeTd.innerText = user.userAge;
        userGenderTd.innerText = user.userGender;
        userLicenceTd.innerText = user.userLicence;
        tr.appendChild(userIdTd);
        tr.appendChild(userNameTd);
        tr.appendChild(userSurnameTd);
        tr.appendChild(userAgeTd);
        tr.appendChild(userGenderTd);
        tr.appendChild(userLicenceTd);
        thbtn.appendChild(DeleteUserButton);
        tr.appendChild(thbtn);
        CustomerList.appendChild(tr);
    });

    selectCar.innerHTML = `<option disabled value selected> -- Select Car --</option>`;
    CarList.forEach((car) => {
        const option = document.createElement("option");
        option.value = car.carBrand;
        option.innerText = car.carBrand;

        selectCar.add(option);
    });

    const Cars = document.getElementById("CarList");
    Cars.innerHTML = "";
    CarList.forEach((car) => {
        const tr = document.createElement("tr");
        const carIdTd = document.createElement("td");
        const carBrandTd = document.createElement("td");
        const carColorTd = document.createElement("td");
        const carPriceTd = document.createElement("td");
        const deleteCarTd = document.createElement("th");

        const DeleteCarButton = document.createElement("button");
        DeleteCarButton.innerText = "Delete Car";
        DeleteCarButton.className = "btn btn-warning";

        DeleteCarButton.addEventListener("click", () => {
            deleteCar(car.carId);
        });

        carIdTd.innerText = car.carId;
        carBrandTd.innerText = car.carBrand;
        carColorTd.innerText = car.carColor;
        carPriceTd.innerText = car.carPrice;
        tr.appendChild(carIdTd);
        tr.appendChild(carBrandTd);
        tr.appendChild(carColorTd);
        tr.appendChild(carPriceTd);
        deleteCarTd.appendChild(DeleteCarButton);
        tr.appendChild(deleteCarTd);
        Cars.appendChild(tr);
    });

    const Rents = document.getElementById("RentList");
    Rents.innerHTML = "";
    RentList.forEach((rent) => {
        const tr = document.createElement("tr");
        const rentIdTd = document.createElement("td");
        const rentUserTd = document.createElement("td");
        const rentCarTd = document.createElement("td");
        const rentedTimetd = document.createElement("td");
        const totalPriceTd = document.createElement("td");
        const deleteRentTd = document.createElement("th");

        const DeleteRentButton = document.createElement("button");
        DeleteRentButton.innerText = "Delete Rent";
        DeleteRentButton.className = "btn btn-info";

        DeleteRentButton.addEventListener("click", () => {
            deleteRent(rent.Id);
        });

        rentIdTd.innerText = rent.Id;
        rentUserTd.innerText = rent.userId;
        rentCarTd.innerText = rent.carId;
        rentedTimetd.innerText = rent.rentedTime;
        totalPriceTd.innerText = rent.totalPrice;
        tr.appendChild(rentIdTd);
        tr.appendChild(rentUserTd);
        tr.appendChild(rentCarTd);
        tr.appendChild(rentedTimetd);
        tr.appendChild(totalPriceTd);
        deleteRentTd.appendChild(DeleteRentButton);
        tr.appendChild(deleteRentTd);
        Rents.appendChild(tr);
    });
}

document.getElementById("addUser").addEventListener("click", (e) => {
    e.preventDefault();
    addUser();
});

document.getElementById("addCar").addEventListener("click", (e) => {
    e.preventDefault();
    addCar();
});

document.getElementById("rentCar").addEventListener("click", (e) => {
    e.preventDefault();
    rentCar();
});

userUpdate();

function deleteUser(userId) {
    UserList.splice(
        UserList.findIndex(
            (user) => user.userId === userId
        ),
        1
    );
    userUpdate();
}

function deleteCar(carId) {
    CarList.splice(
        CarList.findIndex(
            (car) => car.carId === carId
        ),
        1
    );
    userUpdate();
}

function deleteRent(Id) {
    RentList.splice(
        RentList.findIndex(
            (rent) => rent.Id === Id
        ),
        1
    );
    userUpdate();
}