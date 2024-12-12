let input_time = document.getElementById('wake_up_time');
let wake_up_button = document.getElementById('wake_up_button')
let image_loader = document.getElementById('image_loader');
let image_loader_button = document.getElementById('image_loader_button');
let pics = document.getElementById("pic");

let alarm_hour = document.getElementById('alarm_hour');
let alarm_min = document.getElementById('alarm_min');

const sound = new Audio("sounds/alarm.mp3")
//動かない
let alarm_time_h, alarm_time_m,alarm_time_s;

let is_time = false;

input_time.addEventListener('input', () => {
    let [h, m] = (input_time.value).split(':');

    set_alarm(h, m, 0);
    input_time.style.color = "blue";
});

wake_up_button.addEventListener('click', ()=>{
    sound.pause();
    
    if(is_time){
        show_image();

        alarm_hour.classList.add("hidden");
        alarm_min.classList.add("hidden");
        
        wake_up_button.style.color = "blue";
    }
})

image_loader_button.addEventListener('click', ()=>{
    image_loader.click();
});

image_loader.addEventListener('change', (event)=>{
    let img = event.target.files[0];

    let reader = new FileReader();

    reader.onload = () => {
        pics.setAttribute('src', reader.result);
    }

    image_loader_button.innerText = "画像を読み込めました";
    image_loader_button.style.color = "blue";

    reader.readAsDataURL(img);
})

function set_alarm(hour, minuites, second){
    alarm_time_h = hour;
    alarm_time_m = minuites;
    alarm_time_s = second;

    let hRotation = 30 * alarm_time_h + alarm_time_m/2;
    let mRotation = 6 * alarm_time_m;

    

    alarm_hour.style.transform = `rotate(${hRotation}deg)`;
    alarm_min.style.transform = `rotate(${mRotation}deg)`;

    alarm_hour.classList.remove("hidden");
    alarm_min.classList.remove("hidden");
}


function alarm_time(){
    const now = new Date();
    const hours = now.getHours();
    const minutes=now.getMinutes();
    const seconds = now.getSeconds();
    if (alarm_time_h == hours && alarm_time_m == minutes && alarm_time_s == seconds){
        alarm();
    }
}

function show_image(){
    pics.classList.remove("hidden");
    pics.classList.add("show");
}

function play_sounds(){
    sound.currentTime = 0;
    sound.loop = true;
    sound.play();
}

function alarm(){
    wake_up_button.style.color = "red";
    play_sounds();
    
    is_time = true;
}

setInterval(alarm_time, 1000);
