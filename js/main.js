let body = document.body;
let toggler = document.querySelector(".toggler");
let sidebar = document.querySelector(".sidebar");
toggler.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  toggler.classList.toggle("active");
});

// CHANGED WORD
let word_place = document.querySelector(".word");
let words_array = [
  "Web designer",
  "Web developer",
  "Frontend",
  "Backend",
  "Full stack",
];
let change_indicator = 0;

let change_word = function (index) {
  let word = words_array[index];
  let i = 0;
  let end = 0;

  let int = setInterval(() => {
    if (end == 0) {
      if (i < word.length) {
        word_place.textContent += word[i];
        i++;
      } else {
        end = 1;
      }
    } else {
      let full_word = word_place.textContent;
      full_word = full_word.slice(0, full_word.length - 1);
      word_place.textContent = full_word;
      if (full_word.length == 0) {
        clearInterval(int);
        change_indicator++;
        if (change_indicator >= words_array.length) {
          change_indicator = 0;
        }
        check_index(change_indicator);
      }
    }
  }, 200);
};

let check_index = function (index) {
  change_word(index);
};
change_word(0);

// MOOD CHANGE
let mood_btn = document.querySelector(".mood_btn");
let mood_icon = document.querySelector(".mood_btn i");

mood_btn.addEventListener("click", () => {
  mood_icon.classList.toggle("fa-moon");
  mood_icon.classList.toggle("fa-sun");
  body.classList.toggle("light");
  body.classList.toggle("dark");
});

// scroll events
let header = document.querySelector("header");
let up = document.querySelector(".up");
let logo_image = document.querySelector(".logo_image");
let logo_text = document.querySelector(".logo_text");

window.onscroll = () => {
  if (scrollY >= 700) {
    up.classList.remove("hidden");
    logo_image.src = "imgs/shinigami_black_logo.webp";
    logo_text.style.color = "#000";
    header.style.backgroundColor = "rgba(255,255,255,0.6)";
  } else {
    up.classList.add("hidden");
    logo_image.src = "imgs/shinigami_white_logo.webp";
    logo_text.style.color = "#fff";
    header.style.backgroundColor = "transparent";
  }
};

// LAZY LOADING

// images
let image_observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let image = entry.target;
      image.src = image.dataset.src;
      image.classList.add("load");
      self.unobserve(image);
    }
  });
});
let images = Array.from(document.querySelectorAll(".lazy"));
images.forEach((image) => image_observer.observe(image));

// numbers up
let facts_numbers = Array.from(document.querySelectorAll(".facts .number"));
let number_observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let number = entry.target;
      let i = 0;
      let num_val = parseInt(number.textContent);
      let int = setInterval(() => {
        if (i <= num_val) {
          number.textContent = i;
          i++;
        } else {
          clearInterval(int);
        }
      }, 100);
      self.unobserve(number);
    }
  });
});
facts_numbers.forEach((number) => number_observer.observe(number));

// progress
let progresses = Array.from(document.querySelectorAll(".progress_bar"));
let progress_observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let bar = entry.target;
      let progress = bar.children[0];
      let max = parseInt(bar.dataset.max);
      let i = 0;
      let variable = "";
      // console.log(progress_bar.classList);
      let int = setInterval(() => {
        if (i <= max) {
          progress.value = i;
          bar.dataset.progress = `${i}%`;
          if (bar.classList.contains("html")) {
            progresses[0].style = `--html: ${i}%`;
          } else if (bar.classList.contains("css")) {
            progresses[1].style = `--css: ${i}%`;
          } else if (bar.classList.contains("javascript")) {
            progresses[2].style = `--java: ${i}%`;
          } else if (bar.classList.contains("php")) {
            progresses[3].style = `--php: ${i}%`;
          } else if (bar.classList.contains("scss")) {
            progresses[4].style = `--scss: ${i}%`;
          } else if (bar.classList.contains("vue")) {
            progresses[5].style = `--vue: ${i}%`;
          } else if (bar.classList.contains("laravel")) {
            progresses[6].style = `--laravel:${i}%`;
          }
        }
        i++;
      }, 50);
      self.unobserve(bar);
    }
  });
});
progresses.forEach((progress) => progress_observer.observe(progress));

// drag slider
let slider = document.querySelector(".skills .slider");
let inner_slider = document.querySelector(".skills .slider .inner_slider");
let pressed = false;
let startX;
let x;
//
slider.addEventListener("mousedown", (e) => {
  pressed = true;
  startX = e.offsetX - inner_slider.offsetLeft;
  slider.style.cursor = "grabbing";
  // console.log(startX);
});
//
slider.addEventListener("mouseenter", () => {
  slider.style.cursor = "grab";
});
//
// slider.addEventListener("mouseleave", () => {
//   slider.style.cursor = "default";
// });
// //
slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab";
});
//
window.addEventListener("mouseup", () => {
  pressed = false;
});
//
slider.addEventListener("mousemove", (e) => {
  if (!pressed) return;
  e.preventDefault();
  x = e.offsetX;
  inner_slider.style.left = `${x - startX}px`;
  // console.log(`x => ${x}`);
  // console.log(`Sx => ${startX}`);
  check_boundary();
});
//
function check_boundary() {
  let outer = slider.getBoundingClientRect();
  let inner = inner_slider.getBoundingClientRect();
  if (parseInt(inner_slider.style.left) > 0) {
    inner_slider.style.left = "0px";
  } else if (inner.right < outer.right) {
    inner_slider.style.left = `-${inner.width - outer.width}px`;
  }
}
// menu shuffle
let categories = Array.from(document.querySelectorAll(".portfolio .menu li"));
let projects = Array.from(
  document.querySelectorAll(".portfolio .projects .project")
);
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    categories.forEach((cat) => cat.classList.remove("active"));
    cat.classList.add("active");
    projects.forEach((pro) => {
      pro.style.display = "none";
    });
    let category = cat.dataset.cat;
    projects
      .filter((pro) => {
        return pro.classList.contains(`${category}`);
      })
      .forEach((pro) => {
        pro.style.display = "block";
      });
  });
});

// project zoom
let zoom_btns = document.querySelectorAll(".portfolio .pro_zoom");
let zoom_out = document.querySelector(".portfolio .zoom_out");
zoom_btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    projects[index].classList.add("open");
    zoom_out.classList.remove("hidden");
  });
});
zoom_out.addEventListener("click", () => {
  projects.forEach((pro) => pro.classList.remove("open"));
  zoom_out.classList.add("hidden");
});
// SERVICES
let details_btns = document.querySelectorAll(".services .details_btn");
let details = document.querySelectorAll(".services .details");
details_btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    details[index].classList.toggle("hidden");
  });
});
//FEATURES
let feats = document.querySelectorAll(".features ul li");
let feats_image = document.querySelectorAll(".features .images img");
feats.forEach((feat, index) => {
  feat.addEventListener("click", () => {
    feats.forEach((feat) => feat.classList.remove("active"));
    feats_image.forEach((image) => image.classList.remove("active"));
    //
    feat.classList.add("active");
    feats_image[index].classList.add("active");
  });
});
// CHANGE LANGUAGE
let languages_btn = document.getElementById("languages");
languages_btn.addEventListener("change", () => {
  if (languages_btn.value == "english") {
    location.reload();
  } else {
    body.style.direction = "rtl";
    body.style.fontFamily = "Amiri";
    // SIDEBAR
    document.querySelector(".sidebar").classList.add("arabic");
    document.querySelector(".sidebar .profile .name").textContent =
      "حماده ياسر";
    let lis = document.querySelectorAll(".main_menu li");
    lis[0].querySelector("a").textContent = "الرئيسية";
    lis[1].querySelector("a").textContent = "من نحن";
    lis[2].querySelector("a").textContent = "حقائق";
    lis[3].querySelector("a").textContent = "المهارات";
    lis[4].querySelector("a").textContent = "معرض الاعمال";
    lis[5].querySelector("a").textContent = "الخدمات";
    lis[6].querySelector("a").textContent = "الميزات";
    let select = lis[8].querySelector("select");
    select.children[0].textContent = "الانجليزية";
    select.children[1].textContent = "العربية";
    // ABOVE
    document.querySelector(".above .container").style.direction = "ltr";
    // ABOUT
    let titles = Array.from(document.querySelectorAll(".heading .title"));
    titles.forEach((title) => title.classList.add("arabic"));
    document.querySelector(".about .heading .title").textContent = "من نحن";
    document.querySelector(".about .heading .para").textContent =
      "اسعد الله مساكم، انا حماده ياسر كمال (ShiniGami)، وانت ستكون عميلي المميز باذن الله.";
    document.querySelector(".about .text h3").textContent = "مصمم ومطور ويب";
    document.querySelector(".about .text .intro").textContent =
      "لتعرف من انا بشكل افصل, فالنقاط التالية ستكون بداية جيدة";
    document.querySelector(".about .text .end").textContent =
      "في الواقع لم اتعلم برمجة المواقع في الجامعة أو حتي من خلال كورس خاص او مدفوع بل بالتعليم الذاتي من المصادر المفتوحة والمجانية وهذا ما انا فخور به، ويمكنك الحكم علي بعد أن تري أعمالي السابقة والمستقبلية.";
    //
    let about_info = document.querySelector(".about .text .info");
    about_info.classList.add("arabic");
    about_info.children[0].children[0].querySelector("strong").textContent =
      "تاريخ الميلاد:";
    about_info.children[0].children[0].querySelector("span").textContent =
      "١٩ فبراير ٢٠٠١";
    about_info.children[0].children[1].querySelector("strong").textContent =
      "العمر:";
    about_info.children[0].children[1].querySelector("span").textContent =
      "22 عام";
    about_info.children[0].children[2].querySelector("strong").textContent =
      "الهوايات:";
    about_info.children[0].children[2].querySelector("span").textContent =
      " كاتب محتوي، مسوق الكتروني";
    about_info.children[0].children[3].querySelector("strong").textContent =
      "الوظيفة الحكومي:";
    about_info.children[0].children[3].querySelector("span").textContent =
      "اخصائي تمريض";
    about_info.children[0].children[4].querySelector("strong").textContent =
      "عملي الحقيقى والمفضل:";
    about_info.children[0].children[4].querySelector("span").textContent =
      "مصمم ومطور مواقع انترنت";
    //
    about_info.children[1].children[0].querySelector("strong").textContent =
      "الدرجة العلمية:";
    about_info.children[1].children[0].querySelector("span").textContent =
      "بكالوريوس";
    about_info.children[1].children[1].querySelector("strong").textContent =
      "المدينة:";
    about_info.children[1].children[1].querySelector("span").textContent =
      "اسيوط / مصر";
    about_info.children[1].children[2].querySelector("strong").textContent =
      "العمل الحر:";
    about_info.children[1].children[2].querySelector("span").textContent =
      "متوفر";
    about_info.children[1].children[3].querySelector("strong").textContent =
      "البريد الالكتروني:";
    about_info.children[1].children[4].querySelector("strong").textContent =
      "الهاتف";
    about_info.children[1].children[4].querySelector("span").textContent =
      "١٠١٨٠٠٨٣١٦(+٢٠)";
    // FACTS
    document.querySelector(".facts .heading .title").textContent = "حقائق";
    document.querySelector(".facts .heading .para").textContent =
      "من المعرف ان الاحصائيات تعطى وصف شامل وواضح ودقيق عن الحلة العامة للاعمال , فى حالة اذا كانت حقيقية , ولذا اليك بعضا منها ";
    let statics_desc = document.querySelectorAll(".facts .boxes .box .desc");
    statics_desc[0].textContent = "عميل سعيد";
    statics_desc[1].textContent = "مشروع";
    statics_desc[2].textContent = "تصميم مشروع";
    statics_desc[3].textContent = "سنة من الخبرة";
    // SKILLS
    document.querySelector(".skills .heading .title").textContent = "المهارات";
    document.querySelector(".skills .heading .para").textContent =
      "هناك العديد من لغات البرمجة و اطر العمل فى مجال تطوير وتصميم الويب , ومايلي هو ما سوف استخدمه فى مشروعك الخاص";
    // PORTFOLIO
    document.querySelector(".portfolio .heading .title").textContent =
      "معرض الاعمال";
    document.querySelector(".portfolio .heading .para").textContent =
      "يقال ان الصورة بألف كلمة , فما بالك بمشاريع حقيقية مصممة و منفذة بالاضافة الى تلك الصور , حتى تتمكن من الحكم على بشكل اصح قليلا , اما الحكم النهائى سيكون عندما تصبح عميلى , وهذا ما اتتطلع اليه";
    categories[0].textContent = "الكل";
    categories[1].textContent = "التصاميم";
    categories[2].textContent = "صفحات الهبوط";
    categories[3].textContent = "معرض الاعمال";
    categories.forEach((cat) => {
      cat.style = `
      font-weight:bold;
      `;
    });
    // SERVICES
    document.querySelector(".services .heading .title").textContent = "الخدمات";
    document.querySelector(".services .heading .para").textContent =
      "والان بعد أن عرفت من أنا , ورأيت مشاريعى وتصاميمى , حان دور الخدمات التى استطيع أن اقدمها لك فى الوقت الحالى";
    let services_name = document.querySelectorAll(".services .service span");
    services_name[0].textContent = "صفحة هبوط";
    services_name[1].textContent = "موقع شخصى";
    services_name[2].textContent = "موقع خدمى";
    let services_info = document
      .querySelectorAll(".services .service .info")
      .forEach((info) => {
        info.style = "text-align: start;";
        info.querySelector("button").textContent = "التفاصيل";
      });
    details[0].innerHTML = `انشاء سفحة هبوط لاجل: <br> 1- زيادة نسبة الاحالة الى موقعك <br> 2- الترويج لمنتج او خدمة <br> 3- زيادة عدد عناوين البريد الالكتروني في قائمتك البريدية`;
    details[1].textContent =
      "احصل على سيرتك الذاتية الالكترونية لعرض اعمالك ومؤهلاتك, ليعرف العملاء والشركات من انت وما انت قادر على فعله, مثل الموقع الذى تتصفحه فى هذه اللحظة";
    details[2].textContent =
      "احصل على موقعك الالكتروني الذى ينفذ فكرتك ويدعم مشروعك, ويوصل الخدمات التى تقدمها الى عملائك, بالطريقة التى تتناسب مع هذا العصر";
    details.forEach((deta) => (deta.style.fontWeight = "bold"));
    // FEATURES
    document.querySelector(".features .heading .title").textContent = "الميزات";
    document.querySelector(".features .heading .para").textContent =
      "تأتى خدماتنا مع العديد من الميزات الرائعة والمناسبة لطبيعة عملك وفكرتك";
    document.querySelector(".features .text h3").textContent =
      "موقعك الالكترونى سيكون:";
    let featps = document.querySelectorAll(".features .text .list li p");
    featps[0].textContent = "متجاوب مع جميع احجام الشاشات";
    featps[1].textContent = "كود نظيف سهل القراءة والتعيل والتطوير عليه";
    featps[2].textContent =
      "اكواد وملفات صغيرة الحجم لزيادة سرعة التحميل والتصفح";
    featps[3].textContent = "موقع متعدد اللغات";
    featps[4].textContent =
      "يمكن انشاءه من تصميم PSD, XD, figma, sketch او صورة عادية او مجر فكرة";
    featps[5].textContent = "الوضع المظلم و المضئ";
    feats.forEach((feat) => (feat.style.fontWeight = "bold"));
    // let port_cat = document.querySelector(".portfolio .heading .para").textContent = "المهارات";
  }
});
