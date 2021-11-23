<script>
	import { Swiper, SwiperSlide } from 'swiper/svelte';

	// Import Swiper styles
	import 'swiper/css';

	import 'swiper/css/pagination';
	import 'swiper/css/navigation';

	// import Swiper core and required modules
	import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

	// install Swiper modules
	SwiperCore.use([Autoplay, Pagination, Navigation]);
</script>

<Swiper
	spaceBetween={30}
	centeredSlides={true}
	autoplay={{
		delay: 2500,
		disableOnInteraction: false
	}}
	pagination={{
		clickable: true
	}}
	navigation={true}
	class="mySwiper rounded-lg shadow-sm m-8  md:h-auto"
>
	<SwiperSlide
		><img
			src="https://www.beautymentor.in/admin/uploads/sliders/818078banner-5334x1972.jpg"
			alt=""
			class="image-full"
		/></SwiperSlide
	><SwiperSlide><img src="https://marcado.in/images/ffff.jpg" alt="" /></SwiperSlide>
</Swiper>
