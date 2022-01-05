function homePage() {
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
    show_nav_bar();
    get_home_playlist();
    get_home_songs();
    get_home_singers();
}

function showCreateSinger(){
    document.getElementById("ajaxArea").innerHTML = `
<form enctype="multipart/form-data" id="form">
     <input type="text" name="name">
     <input type="text" name="description">
     <input type="file" name="file"/>
     <input type="hidden" name="user" value="${localStorage.getItem("userAccId")}">
     <button type="button" onclick="createSinger()">Upload</button>
</form>`;
}

function createSinger(){
    let form = document.getElementById("form");
    let data = new FormData(form);
    console.log(data)
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/singers",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (singer) {
            console.log(singer)
            alert("Thêm thành công")
        }
    })
}

function showCreateSong() {
    let form = `<section class="breadcrumb">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <h1>Tải bài hát</h1>
                        <h5>Thông tin bài hát</h5>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <ul>
                            <li><a href="#">Trang chủ</a></li>
                            <li><a href="#">Thêm bài hát</a></li>
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
                        <form id="contactform" enctype="multipart/form-data">
                          <div class="row">
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                  <h5>Tên lên bài hát:</h5>
                                  <input type="text" id="name" name="name"/>
                              </div>
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                  <h5>Mô tả:</h5>
                                   <input type="text" name="description" id="description" />
                              </div>
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                  <h5>File bài hát:</h5>
                                   <input type="file" name="file" id="file" />
                              </div>
                              <div class="col-lg-5 col-md-5 col-sm-5">
                                  <h5>Ca sĩ:</h5>
                                   <input type="number" name="singer" id="singer" />
                              </div>
                              <input type="hidden" name="user" value="${localStorage.getItem("userAccId")}">
                          </div>
                          <div class="row">
                              <div class="col-lg-12 col-md-12 col-sm-12">
                                  <h5>Lời bài hát:</h5>
                                  <textarea name="lyrics" id="message"></textarea>
                              </div>
                          </div>
                          <button id="submit1" type="submit" onclick="createSong()">Submit</button>
                      </form>
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

function createSong() {
    let form = document.getElementById("contactform");
    let data = new FormData(form);
    console.log(data)
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "http://localhost:8080/songs",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (mp3) {
            console.log(mp3)
            alert("Thêm thành công")
        }
    })
}

function show_media_list(array) {
    let html = `
    <div class="container">
        <div class="rock-player">
            <div class="playListTrigger">
                <a href="#"><i class="fa fa-list"></i></a>
            </div><!--triggerPlayList in responsive-->
            <div class="row">
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div id="player-instance" class="jp-jplayer"></div>
                            <div class="controls">
                                <div class="jp-prev"></div>
                                <div class="play-pause jp-play"></div>
                                <div class="play-pause jp-pause" style="display:none"></div>
                                <div class="jp-next"></div>
                            </div>
                            <!--controls-->
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                            <div class="player-status">
                                <h5 class="audio-title">Maroon 5 - Moves Like Jagger ft. Christina Aguilera</h5>
                                <div class="audio-timer"><span class="current-time jp-current-time">01:02</span> / <span
                                        class="total-time jp-duration">4:05</span></div>
                                <div class="audio-progress">
                                    <div class="jp-seek-bar">
                                        <div class="audio-play-bar jp-play-bar" style="width:20%;"></div>
                                    </div>
                                    <!--jp-seek-bar-->
                                </div>
                                <!--audio-progress-->
                            </div>
                            <!--player-status-->
                        </div>
                        <!--column-->
                    </div>
                    <!--inner-row-->
                </div>
                <!--column-->

                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <div class="audio-list">
                        <div class="audio-list-icon"></div>
                        <div class="jp-playlist">
                            <!--Add Songs In mp3 formate here-->
                            <ul class="hidden playlist-files">`;
                    for (let i = 0; i < array.length; i++) {
                        html += `<li data-title="${array[i].name}"
                                    data-artist="${array[i].singer.name}"
                                    data-mp3="assets/audio/${array[i].mp3file}"></li>`
                                }
                    html += `
                    </ul>
                            <!--Playlist ends-->
                            <h5>Audio Playlist</h5>
                            <div class="audio-track">
                                <ul>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--row-->
        </div>
    </div>`
    document.getElementById("audio-player").innerHTML = html
}

function show_nav_bar() {
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
                        <input type="text" placeholder="Search" id="search"/>
                        <button type="submit" onclick="searchByName()"><i class="fa fa-search"></i></button>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active dropdown"><a href="#" onclick="homePage()">Trang chủ <i
                                class="fa fa-caret-right"></i></a></li>
                        <li class="yamm-fw dropdown"><a href="#" onclick="get_all_singer()">Nghệ sĩ <i class="fa fa-caret-right"></i></a></li>
                        <li class="dropdown"><a href="#">Danh sách phát <i class="fa fa-caret-right"></i></a></li>`
        if (localStorage.getItem("userAccId") == null) {
            html += `<li><a href="#" onclick="formRegister()">Đăng kí</a></li>
                        <li><a href="#" onclick="formLogin()">Đăng nhập</a></li>`
        }
        if (localStorage.getItem("userAccId") != null) {
            html += `<li><a href="#" onclick="logout()">Đăng xuất</a></li>
                        <li><a href="#" onclick="personal_page(${localStorage.getItem("userAccId")})">${localStorage.getItem("userAccName")}</a></li>
                    <li class="dropdown"><a href="#">Tạo Mới <i class="fa fa-caret-right"></i></a>
                      <ul class="dropdown-menu">
                        <li><a onclick="showCreateSong()">Thêm bài hát</a> </li>
                        <li><a >Thêm danh sách</a> </li>
                        <li><a onclick="showCreateSinger()">Thêm ca sĩ</a> </li>
                      </ul>
                    </li>`
        }
        html +=
                    `</ul>
                </div>
            </div>
        </div>`
    document.getElementById("nav-bar").innerHTML=html;
}

function searchByName(){
    let text = document.getElementById("search").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/songs/search?q=" + text,
        success: function (songs) {
            console.log(songs);
            show_song(songs.content);
            show_media_list(songs.content)
        }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/singers/search?q=" + text,
        success: function (singers) {
            console.log(singers.content);
            show_singers(singers.content);
        }
    })

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/playlists/search?q=" + text,
        success: function (playlists) {
            console.log(playlists);
            show_playlist(playlists);
        }
    })
}

function get_all_singer(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/singers",
        success: function (singers) {
            console.log(singers);
            let html = `
            <section class="breadcrumb">
             <div class="container">
                  <div class="row">
                      <div class="col-lg-6 col-md-6 col-sm-6">
                          <h1>Nghệ sĩ</h1>
                          <h5>Danh sách nghệ sĩ</h5>
                      </div>
                      
                      <div class="col-lg-6 col-md-6 col-sm-6">
                          <ul>
                              <li><a href="#">Trang chủ</a></li>
                              <li><a href="#">Nghệ sĩ</a></li>
                          </ul>
                      </div>
                  </div>
             </div>
        </section>
      <div class="clearfix"></div>
      <section id="artists">
          <div class="container">
              <div class="artist-list">
                  <div class="row">`
            for (let i = 0; i < singers.content.length; i++) {
                if (singers.content[i].status == 1) {
                    html += `
                <div class="album">
                      <img src="assets/img/artist/${singers.content[i].avatar}" alt=""/>
                      <div class="hover">
                          <ul>
                              <li><a onclick="singer_detail(${singers.content[i].id})"><span class="fa fa-search"></span></a></li>`
                              if (singers.content[i].user.id == localStorage.getItem("userAccId")) {
                                  html += `
                                        <li><a onclick="form_update_detail(${singers.content[i].id})"><i class="fas fa-cog"></i></a></li>
                                        <li><a onclick="remove_singer(${singers.content[i].id})"><i class="far fa-trash-alt"></i></a></li>`
                              }

                          html += `</ul>
                          <h3>${singers.content[i].name}</h3>
                      </div>
                  </div>`
                }
            }
            html += `
            </div><!--//artist list-->
              </div><!--row-->
          </div><!--//container-->  
      </section>`
            document.getElementById("ajaxArea").innerHTML = html;
        }
    })
}

function singer_detail(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/singers/" + id,
        success: function (singer) {
            console.log(singer)
            let view = `
            <section class="breadcrumb">
             <div class="container">
                  <div class="row">
                      <div class="col-lg-6 col-md-6 col-sm-6">
                          <h1>artist</h1>
                          <h5>detail of artist</h5>
                      </div>
                      
                      <div class="col-lg-6 col-md-6 col-sm-6">
                          <ul>
                              <li><a href="#">Home</a></li>
                              <li><a href="#">artists</a></li>
                              <li><a href="#">Detail</a></li>
                          </ul>
                      </div>
                  </div>
             </div>
        </section>
            <div class="clearfix"></div>
            <section id="artists">
            <div class="container">
              <div class="row">
                  <div class="artist-detail">
                      <div class="artist">
                          <div class="col-lg-4 col-md-4 col-sm-4">
                          <figure class="artistFace">
                              <img src="assets/img/artist/${singer.avatar}" alt=""/>
                             </figure> 
                          </div>
                           <div class="col-lg-8 col-md-8 col-sm-8">
                              <div class="artist-detail-content">
                                  <h3>${singer.name}</h3>
                                  <p>${singer.description}</p>
                              </div><!--//artist-detail-content-->
                              
                              <div class="artist-tracks">
                                  <h1>Danh sách bài hát</h1>`
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/singers/" + id + "/songs",
                headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
                success: function (songs) {
                    console.log(songs.content);
                    for (let i = 0; i < songs.content.length; i++) {
                        view += `
                        <div class="track clearfix">
                            <div class="track_title" onclick="song_detail(${songs.content[i].id})">${songs.content[i].name}</div>
                            <div class="track_listen">
                                <span><audio controls>
                              <source src="assets/audio/${songs.content[i].mp3file}" type="audio/mpeg">
                          </audio></span>
                            </div>
                        </div>`
                    }
                    view += `
            </div><!--artist tracks-->
                          </div>
                      </div><!--\\\\artist-->
                  </div><!--//artist detail-->
              </div><!--row-->
          </div><!--//container-->  
      </section>`
                    document.getElementById("ajaxArea").innerHTML = view;
                }
            });

        }
    })
}

function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("userAccId")
    localStorage.removeItem("userAccName")
    homePage()
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
    console.log(array)
    let html = `
        <div class="container">
              <h1>Latest Playlists</h1>
              <div class="top-carouselnav">
                  <a href="#" class="prev-album"><span class="fa fa-caret-left"></span></a>
                  <a href="#" class="next-album"><span class="fa fa-caret-right"></span></a>
              </div>
        <div class="albums-carousel">`
    for (let i = 0; i < array.length; i++) {
        html += `
            <div class="album">
                <img src="assets/img/albums/${array[i].image}" alt=""/>
                      <div class="hover">
                          <ul>
                              <li><a href="assets/img/albums/${array[i].image}" data-rel="prettyPhoto"><span class="fa fa-search"  ></span></a></li>
                              <li><a href="album-detail.html"><span class="fa fa-link"></span></a></li>
                          </ul>
                          <h3>${array[i].name}</h3>
                          <h2>${array[i].songs.length} bài hát</h2>
                      </div>
                  </div>`
    }
    html += `</div>
              </div>
          </section>
          <div class="clearfix"></div>`
    document.getElementById("albums").innerHTML = html;
}

function get_home_songs() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/songs",
        success: function (songs) {
            console.log(songs.content);
            show_song(songs.content);
            show_media_list(songs.content)
        }
    })
}

function show_song(array) {
    let list = `<h1>Latest songs</h1>`
    for (let i = 0; i < array.length; i++) {
        list += `<div class="news-feed">
                          <img src="assets/img/artist/${array[i].singer.avatar}" alt="dummy">
                          <a href="#">${array[i].name} - ${array[i].singer.name}</a>
                          <audio controls>
                              <source src="assets/audio/${array[i].mp3file}" type="audio/mpeg">
                          </audio>
                      </div>`
    }
    document.getElementById("latest_song").innerHTML = list
}

function get_home_singers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/singers",
        success: function (singers) {
            console.log(singers);
            show_singers(singers.content);
        }
    })
}

function show_singers(array) {
    let html = `<h1>Latest artists</h1>`
    for (let i = 0; i < array.length; i++) {
        html += `<div class="video-feed">
                     <img src="assets/img/artist/${array[i].avatar}" alt=""/>
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
            localStorage.setItem("userAccId", user.id)
            localStorage.setItem("userAccName", user.username)
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

function personal_page(userId) {
    console.log(userId)
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
    get_personal_playlist(userId);
    get_personal_songs(userId);
    get_personal_singers(userId)
}

function get_personal_playlist(userId) {
    console.log(userId)
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/" + userId + "/playlists",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (playlists) {
            console.log(playlists);
            show_playlist(playlists)
        }
    });
}

function get_personal_songs(userId) {
    console.log(userId)
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/" + userId + "/songs",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (songs) {
            console.log(songs);
            show_song(songs)
        }
    });
}

function get_personal_singers(userId) {
    console.log(userId)
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/" + userId + "/singers",
        headers: { "Authorization": 'Bearer ' + localStorage.getItem("token") },
        success: function (singers) {
            console.log(singers);
            show_singers(singers)
        }
    });
}
