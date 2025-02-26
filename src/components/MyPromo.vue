<template>
    <section class="" style="
						background-image: url('/img/hero-bg.jpg');
						background-position: top;
						background-repeat: no-repeat;
						background-size: cover;
					">
        <div class="py-5 container">
            <div class="py-5 col-lg-6 col-md-8 text-white">
                <h1 class="fw-bold">Акселератор проектов БГУ</h1>
                <p class="pt-5 fw-medium">
                    <slot></slot>                    
                </p>
            </div>
        </div>
    </section>
</template>
<script>
export default{
    name:'MyPromo'
}
</script>