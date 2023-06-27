<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import { fabric } from 'fabric'
  import { store } from './store.js'
  import Navbar from './components/Navbar.vue'
  import Hero from './components/Hero.vue'

  const state = reactive({
    uploadedImage: null
  })

  const fileInput = ref()
  const canvasElement = ref()
  const bubblesList = ref()
  let canvas

  onMounted(() => {
    const canvasSize = canvasElement.value.parentElement.clientWidth
    if (window.innerWidth > 992) {
      bubblesList.value.style.height = `${canvasSize}px`
    }
    canvasElement.value.parentElement.style.height = canvasSize
    canvas = new fabric.Canvas(canvasElement.value, {
      width: canvasSize,
      height: canvasSize
    })
    canvas.selection = false

    if (typeof window.ethereum !== 'undefined') {
      store.connectedAccount = window.ethereum.selectedAddress
    }
  })

  function onFileUploaded (event) {
    if (event.target.files.length) {
      state.uploadedImage = event.target.files[0]

      var reader = new FileReader();
      reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
          var image = new fabric.Image(imgObj);
          if (imgObj.width >= imgObj.height) {
            image.scaleToWidth(canvasElement.value.clientWidth);
          }
          else {
            image.scaleToHeight(canvasElement.value.clientWidth);
          }
          canvas.centerObject(image);
          image.selectable = false;
          canvas.add(image);
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    else {
      state.uploadedImage = null
    }
  }

  function onBubbleClicked (event) {
    if (state.uploadedImage) {
      const imgInstance = new fabric.Image(event.target)
      imgInstance.scale(0.5)
      canvas.centerObject(imgInstance)
      canvas.add(imgInstance)
    }
  }

  function onSaveImageClicked () {
    const href = canvas.toDataURL({
      format: 'png'
    });
    var link = document.createElement('a');
    link.download = 'cheeckygum.png';
    link.href = href;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
</script>

<template>
  <Navbar />

  <main>
    <Hero />

    <section class="py-16 bg-violet" id="createAvatar">
      <div class="container flex flex-col items-center">
        <div class="text-center lg:max-w-[60%] mb-10">
          <h2 class="text-3xl lg:text-5xl font-bold uppercase mb-8 text-purple-light font-ravie" style="text-shadow: -4px 2px 2px #DB30B0;">Create avatar for Twitter</h2>
          <p class="text-xl lg:text-2xl text-purple-light">Let's have some cheeky fun and make some noise on twitter for once! Install gummoji for yourself and your friend or influencer you follow. This could become viral entertainment on social media!!!</p>
        </div>
        <div class="flex flex-col lg:flex-row justify-center gap-7 mb-10 w-full xl:w-[60%] 2xl:w-[80%]">
          <input
            @change="onFileUploaded($event)"
            type="file"
            accept="image/*"
            hidden
            ref="fileInput"
          >
          <div class="grow bg-purple-light">
            <canvas ref="canvasElement"></canvas>
          </div>
          <div ref="bubblesList" class="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-scroll lg:overflow-x-hidden lg:overflow-y-scroll">
            <img
              v-for="i of 66"
              :key="i"
              :src="`bubbles/${i}.png`"
              :alt="`${i}.png`"
              @click="onBubbleClicked($event)"
              class="w-[100px] height-[100px] cursor-pointer"
              loading="lazy"
            >
          </div>
        </div>
        <button
          v-if="state.uploadedImage"
          @click="onSaveImageClicked"
          class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-purple-light text-violet hover:opacity-80 transition-opacity"
        >
          Save image
        </button>
        <button
          v-else
          @click="fileInput.click()"
          class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-purple-light text-violet hover:opacity-80 transition-opacity"
        >
          Upload image
        </button>
      </div>
    </section>

    <section class="bg-purple pb-10 flex flex-col items-center">
      <img src="/cover_purple.png" alt="Banner" class="w-100 mb-10">
      <a href="/cover_purple.png" download class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-violet text-purple-light hover:opacity-80 transition-opacity">Download cover</a>
    </section>

    <section class="py-16 bg-purple" id="about">
      <div class="container flex justify-center text-center">
        <div class="lg:max-w-[60%]">
          <h2 class="text-3xl lg:text-5xl font-bold uppercase mb-8 text-violet font-ravie" style="text-shadow: -4px 2px 2px #ffbded;">About</h2>
          <p class="text-xl lg:text-2xl mb-10 text-purple-light">
            We are the first cheeky chewing Meme on planet earth. 8 billion + users))) Who ever chewed gum at least once in their life.
            Cheeky bubble is bound to become a great Meme of all times and peoples.
            We are created for Crypto and for all financial systems of the world.
            We are here to do something really GREAT!
            We don't imitate. We have our own way🚀
          </p>
          <ul class="flex gap-4 justify-center mb-8 flex-wrap">
            <li class="text-xl lg:text-2xl bg-violet text-purple-light px-5 py-2 rounded-xl">NEW IDEA</li>
            <li class="text-xl lg:text-2xl bg-violet text-purple-light px-5 py-2 rounded-xl">TEAM</li>
            <li class="text-xl lg:text-2xl bg-violet text-purple-light px-5 py-2 rounded-xl">AIRDROP</li>
            <li class="text-xl lg:text-2xl bg-violet text-purple-light px-5 py-2 rounded-xl">ROAD MAP</li>
            <li class="text-xl lg:text-2xl bg-violet text-purple-light px-5 py-2 rounded-xl">EXCLUSIVE</li>
            <li class="text-xl lg:text-2xl bg-violet text-purple-light px-5 py-2 rounded-xl">Creating your own BRAND</li>
          </ul>
          <p class="text-xl lg:text-2xl text-purple-light">Forward!!! To the moon!!!</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-violet" id="howToBuy">
      <div class="container flex justify-center text-center">
        <div class="lg:max-w-[60%] grow">
          <h2 class="text-3xl lg:text-5xl font-bold uppercase mb-8 text-purple-light font-ravie" style="text-shadow: -4px 2px 2px #DB30B0;">How to buy</h2>
          <iframe src="https://app.uniswap.org/#/tokens/ethereum/0x70c573c15e95eebd71bae6a4b0a786b7ba3f5608" frameborder="0" width="100%" height="500" class="mb-10"></iframe>
          <div class="flex justify-center gap-5 flex-wrap">
            <a href="https://app.uniswap.org/#/tokens/ethereum/0x70c573c15e95eebd71bae6a4b0a786b7ba3f5608" target="_blank" rel="noopener noreferrer" class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-purple-light text-violet hover:opacity-80 transition-opacity">Uniswap</a>
            <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xaff42cbadc13adec0b96dac81444a3be1d095def" target="_blank" rel="noopener noreferrer" class="text-xl lg:ftext-2xl font-semibold py-4 px-20 rounded-full bg-purple-light text-violet hover:opacity-80 transition-opacity">DEXTools</a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-purple" id="tokenomic">
      <div class="container flex items-center justify-center gap-20">
        <div>
          <h2 class="text-3xl lg:text-5xl font-bold uppercase mb-8 text-violet font-ravie" style="text-shadow: -4px 2px 2px #ffbded;">Tokenomic</h2>
          <div class="ps-5 mb-10">
            <ul class="text-xl lg:text-2xl list-disc text-purple-light">
              <li class="mb-3">Token name: GumBoy</li>
              <li class="mb-3">Total supply: 500&nbsp;000&nbsp;000&nbsp;000&nbsp;000</li>
              <li class="mb-3">Influencers and marketing 1%</li>
              <li class="mb-3">Airdrop 2%</li>
              <li class="mb-3">Charity 3%</li>
              <li class="mb-3">Team 10%</li>
              <li class="mb-3">CEX 10%</li>
              <li>Creating a Pool on Uniswap 74%</li>
            </ul>
          </div>
          <a href="https://etherscan.io/token/0x70c573C15e95EeBd71Bae6A4B0a786B7bA3f5608" target="_blank" rel="noopener noreferrer" class="text-xl lg:text-2xl font-semibold py-4 px-20 rounded-full bg-violet text-purple-light hover:opacity-80 transition-opacity inline-block mb-4">Token tracker</a>
          <p class="text-xl lg:text-2xl text-purple-light break-all">0x70c573C15e95EeBd71Bae6A4B0a786B7bA3f5608</p>
        </div>
        <img
          src="/logo.png"
          alt="logo.png"
          class="w-[650px] hidden lg:block"
        >
      </div>
    </section>

    <section class="py-16 bg-purple" id="roadmap">
      <div class="container flex flex-col items-center">
        <div class="text-center mb-10 lg:w-[60%]">
          <h2 class="text-3xl lg:text-5xl font-bold font-ravie uppercase text-violet mb-8" style="text-shadow: -4px 2px 2px #ffbded;">Cheeky roadmap</h2>
          <p class="text-xl lg:text-2xl text-purple-light">We have a fundamentally new model of the Meme project that will connect the virtual world with the real one. And your favorite project can boast of this? Are you tired of projects that use other people's KNOWN and Reputable names that do not belong to them? Join those who are the future. We are writing history NOW!!!</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-9 justify-center">
          <div class="bg-violet text-purple-light px-8 py-6 rounded-xl">
            <h4 class="text-xl lg:text-2xl font-bold mb-5">Phase 1</h4>
            <div class="ps-5">
              <ul class="text-xl lg:text-2xl list-disc text-purple-light">
                <li>✔️ Airdrop 2%</li>
                <li>✔️ Charity 3%</li>
                <li>✔️ Creating a Pool on Uniswap 74%</li>
                <li>2000+ holders = Telegram Group</li>
                <li>5000+ holders = Discord</li>
              </ul>
            </div>
          </div>
          <div class="bg-violet text-purple-light px-8 py-6 rounded-xl">
            <h4 class="text-xl lg:text-2xl font-bold mb-5">Phase 2</h4>
            <div class="ps-5">
              <ul class="text-xl lg:text-2xl list-disc text-purple-light">
                <li>10000+ Holders = CEX Listings</li>
                <li>NFT collection for the first 2000 top holders</li>
                <li>DAO</li>
              </ul>
            </div>
          </div>
          <div class="bg-violet text-purple-light px-8 py-6 rounded-xl">
            <h4 class="text-xl lg:text-2xl font-bold mb-5">Phase 3</h4>
            <div class="ps-5">
              <ul class="text-xl lg:text-2xl list-disc text-purple-light">
                <li>Gumboy Merch</li>
                <li>Release of own brand chewing gum. GumBoy</li>
                <li>MOON</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-4 bg-violet">
    <div class="container text-center">
      <p class="text-purple-light mb-3">The token is for entertainment purposes only.</p>
      <p class="text-purple-light mb-3">We own our names ENS. We own our Brand.</p>
      <ul class="flex items-center justify-center flex-wrap gap-y-2 gap-x-4 text-purple-light mb-3">
        <li>gumboy.eth</li>
        <li>$gumboy.eth</li>
        <li>cheekygum.space</li>
        <li>cheekygum.eth</li>
      </ul>
      <a href="mailto:contact@cheekygum.space" class="text-purple-light">contact@cheekygum.space</a>
    </div>
  </footer>
</template>

<style scoped></style>
