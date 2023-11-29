<template>
<div class="accordion m-0 opacity-100" id="accordionPanelsStayOpenExample">

  <div class="p-5">
      <h3 class="text-light mb-3" >İLETİŞİME GEÇ</h3>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-light">İsim soyisim</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="İsim soyisim">
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label text-light">Email adresiniz</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
      </div>
      <div class="mb-2">
        <label for="exampleFormControlInput1" class="form-label text-light">Telefon numarası</label>
        <input type="tel" class="form-control" id="exampleFormControlInput1" placeholder="541 555 66 77">
      </div>
      
      <div class="form-floating mb-2">
        <textarea class="form-control" placeholder="Mesajınızı yazınız" id="floatingTextarea2" style="height: 150px"></textarea>
        <label for="floatingTextarea2">Mesajınızı yazınız</label>
      </div>
      <div class="form-floating mb-3 d-grid">
        <button class="btn btn-sm btn-primary ">Gönder</button>
      </div>
    </div>

  
</div>
<div class="delinator-line my-3 bg-light"><div class="delinator"></div></div>

</template>

<script setup>

const showAdvert = (whatFor) => {
    console.log(whatFor)
}

</script>