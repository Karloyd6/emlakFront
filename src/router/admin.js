const adminRoutes = [
    {
        name: "AddAdvert",
        path : "/admin/addAdvert",
        component : ()=> import("@/views/admin/addAdvert.vue")
    },
    {
        name : "AddImages",
        path : "/admin/addimages",
        component : ()=> import("@/views/admin/addImages.vue")
    },
    {
        name : "AdvertList",
        path : "/admin",
        component : ()=> import("@/views/admin/advertList.vue")
    },
    {
        name : "AdvertDetails",
        path : "/admin/advertdetails",
        component : ()=> import("@/views/admin/advertDetails.vue")
    },
    {
        name : "EditAdvert",
        path : "/admin/editadvert",
        component : ()=> import("@/views/admin/editAdverts.vue")
    },
    {
        name : "LoginPage",
        path : "/admin/login",
        component : ()=> import("@/views/admin/LoginPage.vue")
    },
    {
        name : "EditProfile",
        path : "/admin/editprofile",
        component : ()=> import("@/views/admin/editProfile.vue")
    }
]

export default adminRoutes;