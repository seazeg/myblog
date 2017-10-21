<template>
    <div class="album-box">
        <!-- <div class="tit">
            <img src="../assets/images/logo_w@2x.png">
        </div> -->
        <div class="grid">
            <figure class="effect-bubba">
                <img src="../assets/images/pho/3.jpg" alt="img22">
                <figcaption>
                    <h2>大街小巷
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <router-link class="animate-link" to="/photos">enter</router-link>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/4.jpg" alt="img22">
                <figcaption>
                    <h2>玲琅满物
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/1.jpg" alt="img22">
                <figcaption>
                    <h2>秋意浓
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/5.jpg" alt="img22">
                <figcaption>
                    <h2>秋意浓
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/6.jpg" alt="img22">
                <figcaption>
                    <h2>沙
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/7.jpg" alt="img22">
                <figcaption>
                    <h2>海
                        <span>season</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/9.jpg" alt="img22">
                <figcaption>
                    <h2>树
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/2.jpg" alt="img22">
                <figcaption>
                    <h2>猫
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
            <figure class="effect-bubba">
                <img src="../assets/images/pho/3.jpg" alt="img22">
                <figcaption>
                    <h2>秋意浓
                        <span>late autumn</span>
                    </h2>
                    <p>摄于青岛八大关 2016.11.2</p>
                    <a href="#/index2.html#">View more</a>
                </figcaption>
            </figure>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style scoped>
    @import '../assets/css/set2.css';

    .album-box {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        background: #2f3238;
    }

    .album-box h2,
    .album-box p {
        color: #fff;
    }

    .album-box h2 {
        font-size: 24px;
        font-weight: bolder;
    }

    .album-box span {
        font-size: 12px;
        font-style: initial;
        letter-spacing: 4px;
        display: block;
        font-weight: normal;
        margin-top: 2px;
    }

    .album-box .tit {
        margin: 0 auto;
        margin-top: 20px;
        text-align: center;
    }


    .album-box .tit img {
        width: 200px;
    }
</style>