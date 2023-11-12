<template>
  <header class="ml-3 header-place pb-2 pt-3">
    <div class="row d-flex-row align-items-center pt-2 justify-content-between">
      <div class="col">
        <div class="row">
          <!--! LOGO PLACE  -->

          <div
            class="col col-lg-4 col col-md-12 col-sm-12 col-12 d-flex justify-content-center ps-3 mb-3 logo-place me-3"
          >
            <!-- <h3>KILINÇ_Emlak</h3> -->
            <!-- <img src="../../assets/images/kilinc.png" class="header-image" alt=""> -->
            <h3><i class="fa-solid fa-mountain-city"></i> KILINÇ_emlak</h3>
          </div>

          <!--! LOGO PLACE END-->

          <!--! SOCİAL MEDİA LİNK PLACE -->

          <div
            class="col col-lg-2 col-md-12 col-sm-12 col-12 d-flex justify-content-center"
          >
            <div class="social-place d-flex justify-content-around">
              <a
                href="#"
                class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                ><i class="fa-brands fa-instagram fa-xl"> </i
              ></a>
              <a
                href="#"
                class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover dropdown"
                ><i class="fa-brands fa-twitter fa-xl"> </i
              ></a>
              <a
                href="#"
                class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                ><i class="fa-brands fa-facebook fa-xl"> </i
              ></a>
            </div>
          </div>
          <!--! SOCİAL MEDİA LİNK PLACE END-->
        </div>
      </div>

      <!--! NAVBAR PLACE -->

      <div class="col col-lg-4 col-md-12 col-sm-12 col-12 pe-5">
        <nav class="navbar navbar-expand-lg header-place">
          <div class="container-fluid pe-0">
            <a class="navbar-brand" href="#"
              ><i class="fa-solid fa-house fa-s"> </i> Anasayfa</a
            >
            <button
              class="navbar-toggler bg-danger"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              class="collapse navbar-collapse pe-0"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <!--* dropdown link-->
                <li class="nav-item dropdown">
                  <a class="nav-link dropbtn" href="#">İlanlar
                    <div class="dropdown-content">
                      <a href="#">Tümü</a>
                      <a href="#">Satılık</a>
                      <a href="#">Kiralık</a>
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Hakkımızda</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">İletişim</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <!--! NAVBAR PLACE END-->
    </div>
  </header>
</template>
