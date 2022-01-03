function homePage(user) {
    document.getElementById("ajaxArea").innerHTML = `
    <section id="albums"></section>
    <div class="clearfix"></div>
    <section id="updates">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6" id="latest_song"></div><!--latest songs-->
                <div class="col-lg-6 col-md-6 col-sm-6" id="latest_artists"></div><!--latest artists-->
            </div>
        </div>
    </section>`;
    show_nav_bar(user);
    get_home_playlist();
    get_home_songs();
    get_home_singers()

}

function show_nav_bar(user) {
    let html = `<div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle fa fa-navicon"></button>
                <a class="navbar-brand" href="index.html">
                    <img src="assets/img/basic/logo.png" alt="logo"/>
                </a>
            </div>
            <div class="nav_wrapper">
                <div class="nav_scroll">
                    <div class="nav-search">
                        <form>
                            <input type="text" placeholder="Search"/>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>
                    </div>

                    <ul class="nav navbar-nav">
                        <li class="active dropdown"><a href="#" onclick="homePage(user)">Trang chủ <i
                                class="fa fa-caret-right"></i></a></li>
                        <li class="yamm-fw dropdown"><a href="#">Nghệ sĩ <i class="fa fa-caret-right"></i></a></li>
                        <li class="dropdown"><a href="#">Danh sách phát <i class="fa fa-caret-right"></i></a></li>`
        if(user == null) {
            html += `<li><a href="#" onclick="formRegister()">Đăng kí</a></li>
                     <li><a href="#" onclick="formLogin()">Đăng nhập</a></li>`
        }
        if(user != null) {
            html += `<li><a href="#">Đăng xuất</a></li>
                     <li><a href="#"onclick="personal_page(user)">${user.username}</a></li>
                     <li><a href="#"onclick="edit_personal_infor(user)">Sửa thông tin</a></li>`
        }
        html += `</ul>
                </div>
            </div>
        </div>`
    document.getElementById("nav-bar").innerHTML=html;
}

function home_slider() {
    let html = `
            <div class="container">
                <div class="home-inner">
                    <div id="homeSliderNav" class="slider-nav">
                        <a id="home-prev" href="#" class="prev fa fa-chevron-left"></a>
                        <a id="home-next" href="#" class="next fa fa-chevron-right"></a>
                    </div><!--sliderNav-->
                    <div id="flex-home" class="flexslider" data-animation="slide" data-animationSpeed="1000"
                         data-autoPlay="true" data-slideshowSpeed="7000">
                        <ul class="slides">
                            <li><img src="assets/img/artist/keiko.png" alt="">
                                <div class="flex-caption">
                                    <h2>Kubota Keiko</h2>
                                </div>
                            </li>
                            <li><img src="assets/img/artist/lisa.png" alt="">
                                <div class="flex-caption">
                                    <h2>LiSA</h2>
                                </div>
                            </li>
                            <li><img src="assets/img/artist/taylor.png" alt="">
                                <div class="flex-caption">
                                    <h2>Taylor Swift</h2>
                                </div>
                            </li>
                            <li><img src="assets/img/artist/rin.png" alt="">
                                <div class="flex-caption">
                                    <h2>Kagamine Rin & Len</h2>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`
    console.log(html)
    document.getElementById("home-slider").innerHTML = html;
}

function get_home_playlist() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/playlists",
        success: function (playlists) {
            console.log(playlists);
            show_playlist(playlists)
        }
    })
}

function show_playlist(array) {
    let html = `
        <div class="container">
            <h1>Latest Playlist</h1>
            <div class="top-carouselnav">
                <a href="#" class="prev-album"><span class="fa fa-caret-left"></span></a>
                <a href="#" class="next-album"><span class="fa fa-caret-right"></span></a>
            </div>`
    for (let i = 0; i < array.length; i++) {
        html += `<div class="albums-carousel">
                            <div class="album">
                                <img src="assets/img/artist/keiko.png" alt=""/>
                                <div class="hover">
                                    <ul>
                                        <li><a href="#"><span class="fa fa-search"></span></a></li>
                                    </ul>
                                    <h3>${array[i].songs.length} bài hát</h3>
                                    <h2>${array[i].name}</h2>
                                </div>
                            </div><!--\\\\album-->
                        </div>`
    }
    html += `</div>`
    document.getElementById("albums").innerHTML = html;
}

function get_home_songs() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/songs",
        success: function (songs) {
            console.log(songs.content);
            show_song(songs.content);
            // show_media_list(songs.content)
        }
    })
}

function show_song(array) {
    let list = `<h1>Latest songs</h1>`
    for (let i = 0; i < array.length; i++) {
        list += `<div class="news-feed">
                          <img src="${array[i].image}" alt="dummy">
                          <a href="#">${array[i].name}</a>
                          <ul>
                              <li>${array[i].singer.name}</li>
                              <li><span class="fa fa-comment"></span>5 comments</li>
                          </ul>
                          <p>${array[i].description}</p>
                      </div>`
    }
    document.getElementById("latest_song").innerHTML = list
}

function show_media_list(array) {
    let list = ``;
    for (let i = 0; i < array.length; i++) {
        list += `<li data-title="${array[i].name}"
                    data-artist="${array[i].singer.name}"
                    data-mp3="${array[i].mp3file}"></li>`
    }
    console.log(list)
    document.getElementById("media-playlist").innerHTML = list;
}

function get_home_singers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/singers",
        success: function (singers) {
            console.log(singers);
            show_singers(singers);
            // show_media_list(songs.content)
        }
    })
}

function show_singers(array) {
    let html = `<h1>Latest artists</h1>`
    for (let i = 0; i < array.length; i++) {
        html += `<div class="video-feed">
                     <img src="${array[i].avatar}" alt=""/>
                     <a href="video-detail.html"><span class="fa fa-play"></span></a>
                     <h6>${array[i].name}</h6>
                 </div>`
    }
    document.getElementById("latest_artists").innerHTML = html
}

function formLogin() {
    let form = `<section class="breadcrumb">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <h1>Đăng nhập</h1>
                        <h5>Thông tin đăng nhập</h5>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <ul>
                            <li><a href="#">Trang chủ</a></li>
                            <li><a href="#">Đăng nhập</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <div class="clearfix"></div>
        <section id="contact">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 col-md-9 col-sm-9">
                        <div class="row">
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <h5>Tên đăng nhập:</h5>
                                <input type="text" id="username"/>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <h5>Mật khẩu:</h5>
                                <input type="text" id="password"/>
                            </div>
                        </div>
                        <button id="submit1" type="submit" onclick="login()">Đăng nhập</button>
                        <div id="valid-issue" style="display:none;"> Please Provide Valid Information</div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3">
                        <h3>Thông tin liên hệ</h3>
                        <p>Nhà số 23, Lô TT-01, Khu đô thị MonCity, P. Hàm Nghi, Hà Nội</p>
                        <i class="fa fa-mobile-phone"></i>
                        <p>0988666888</p>
                        <b class=" fa fa-envelope"></b>
                        <p>gr3@c0821i1.com</p>
                    </div>
                </div>
            </div>
        </section>`;
    document.getElementById("ajaxArea").innerHTML = form;
}

function login() {
    let user = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (user) {
            console.log(user)
            localStorage.setItem("token", user.accessToken)
            homePage(user)
        },
        error: function (error) {
        }
    });
}

function formRegister() {
    let form = `<section class="breadcrumb">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <h1>Đăng kí</h1>
                        <h5>Thông tin đăng kí</h5>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <ul>
                            <li><a href="#">Trang chủ</a></li>
                            <li><a href="#">Đăng kí</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <div class="clearfix"></div>
        <section id="contact">
            <div class="container">
                <div class="row">
                    <div class="col-lg-9 col-md-9 col-sm-9">
                        <div class="row">
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <h5>Tên đăng nhập:</h5>
                                <input type="text" id="username"/>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <h5>Email:</h5>
                                <input type="text" id="email"/>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <h5>Mật khẩu:</h5>
                                <input type="text" id="password"/>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <h5>Xác nhận lại mật khẩu:</h5>
                                <input type="text" id="confirmPassword"/>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-5">
                                <h5>Họ và tên:</h5>
                                <input type="text" id="fullName"/>
                            </div>
                        </div>
                        <button id="submit1" type="submit" onclick="register()">Đăng kí</button>
                        <div id="valid-issue" style="display:none;"> Please Provide Valid Information</div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3">
                        <h3>Thông tin liên hệ</h3>
                        <p>Nhà số 23, Lô TT-01, Khu đô thị MonCity, P. Hàm Nghi, Hà Nội</p>
                        <i class="fa fa-mobile-phone"></i>
                        <p>0988666888</p>
                        <b class=" fa fa-envelope"></b>
                        <p>gr3@c0821i1.com</p>
                    </div>
                </div>
            </div>
        </section>
        <br> <br>`;
    document.getElementById("ajaxArea").innerHTML = form;
}

function register() {
    let user = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value,
        "confirmPassword": document.getElementById("confirmPassword").value,
        "email": document.getElementById("email").value,
        "fullName": document.getElementById("fullName").value,
    }
    console.log(user)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/register',
        data: JSON.stringify(user),
        success: function () {
            alert("Registered successfully!")
            homePage()
        }
    })
}

function personal_page(user) {
    document.getElementById("ajaxArea").innerHTML = `
    <section id="albums"></section>
    <div class="clearfix"></div>
    <section id="updates">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6" id="latest_song"></div><!--latest songs-->
                <div class="col-lg-6 col-md-6 col-sm-6" id="latest_artists"></div><!--latest artists-->
            </div>
        </div>
    </section>`;
    // home_slider();
    get_personal_playlist(user);
    get_personal_songs(user);
}

function get_personal_playlist(user) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/" + user.id + "/playlists",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (data) {
            console.log(data);
        }
    });
}
