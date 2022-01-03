function homePage() {
    document.getElementById("ajaxArea").innerHTML = `
    <section id="home-slider"></section>
    <div class="rockPlayerHolder"></div>
    <section id="albums"></section>
    <div class="clearfix"></div>
    <section id="updates">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-7 col-sm-6" id="latest_song"></div><!--latest songs-->
                <div class="col-lg-4 col-md-5 col-sm-6" id="latest_artists">
                    <h1>Latest artists</h1>
                        <a href="artist-detail.html"><img src="assets/img/artist/keiko.png" alt=""/></a>
                </div><!--latest artists-->
            </div>
        </div>
    </section>`;
    home_slider();
    home_playlist();
    home_songs();
}

function home_slider() {
    console.log("hahahaha");
    document.getElementById("home-slider").innerHTML = `
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
        </div>`;
}

function home_playlist() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/playlists",
        success: function (playlists) {
            console.log(playlists);
            let html = `
        <div class="container">
            <h1>Latest Playlist</h1>
            <div class="top-carouselnav">
                <a href="#" class="prev-album"><span class="fa fa-caret-left"></span></a>
                <a href="#" class="next-album"><span class="fa fa-caret-right"></span></a>
            </div>`
            for (let i = 0; i < playlists.length; i++) {
                html += `<div class="albums-carousel">
                            <div class="album">
                                <img src="assets/img/artist/keiko.png" alt=""/>
                                <div class="hover">
                                    <ul>
                                        <li><a href="#"><span class="fa fa-search"></span></a></li>
                                    </ul>
                                    <h3>${playlists[i].songs.length} bài hát</h3>
                                    <h2>${playlists[i].name}</h2>
                                </div>
                            </div><!--\\\\album-->
                        </div>`
            }
            html += `</div>`
            document.getElementById("albums").innerHTML = html;
        }
    })
}

function home_songs() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/songs",
        success: function (songs) {
            console.log(songs.content);
            let play = `<div class="player">
                            <div class="pl"></div>
                            <div class="title"><marquee class="mar" direction="left"></marquee></div>
                            <div class="artist"></div>
                            <div class="cover"></div>
                            <div class="controls">
                                <div class="rew"></div>
                                <div class="play"></div>
                                <div class="pause"></div>
                                <div class="fwd"></div>
                            </div>
                            <div class="volume"></div>
                            <div class="tracker"></div>
                        </div>
                        <ul class="playlist hidden">
                            <li audiourl="assets\\audio\\A-Thousand-Year-Christina-peri.mp3" cover="assets/img/artist/Christina Perri.jpg" artist="Christina Perri">A Thousand Year</li>
                        </ul>`
            let html = `<h1>Latest songs</h1>`
            for (let i = 0; i < songs.content.length; i++) {
                html += `<audio controls loop>
                            <source src="${songs.content[i].mp3file}" type="audio/mpeg">
                        </audio>`
            }
            document.getElementById("latest_song").innerHTML = play;
        }
    })
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
            homePage()
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
