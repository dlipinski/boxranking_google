document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    initSliders()
    smallInit()
    initTypeListener()
    initDaysListener()
    initCityListener()
    initSubmitFind()
}

const initSubmitFind = () => {
    let searchButton = document.querySelector('#search')
    searchButton.addEventListener('click', () => {
        let body = {}
        body.city = document.querySelector('#cityPicker').value
        body.types = [...document.querySelector('#typePicker').options].filter(x => x.selected).map(x => x.value)
        body.days = document.querySelector(`#days20`).classList.contains('active') ? 20 : 28
        body.prices = document.querySelector('#priceRange').noUiSlider.get()
        body.calories = document.querySelector('#caloriesRange').noUiSlider.get()
        let xhr = new XMLHttpRequest()
        xhr.open('POST', '/API/search', true)
        xhr.setRequestHeader("Content-Type", "application/json")   
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState == 4) {
                if(xhr.status == 200)
                    console.log(xhr.responseText);
                else
                    console.log("Błąd podczas ładowania strony\n");
            }
        })
        xhr.send(JSON.stringify(body))
    })
}

const initDaysListener = () => {
    let days20 = document.querySelector('#days20')
    let days28 = document.querySelector('#days28')
    let cookies = document.cookie.split(';').map(x => x = { name: x.split('=')[0].trim(),value:  x.split('=')[1] })
    cookies.get = (name) => {
        return cookies.filter(x => x.name === name)[0] ? cookies.filter(x => x.name === name)[0].value : undefined
    }
    console.log(document.cookie)
    if(cookies.get('days')){
        setTimeout(()=>{
            document.querySelector(`#days${cookies.get('days')}`).click()
        },10)
       
    }
        
    days20.addEventListener('click', () => {
        document.cookie = `days=20; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        days28.classList.remove('active')
        days20.classList.add('active')
    })
    days28.addEventListener('click', () => {
        document.cookie = `days=28; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        days20.classList.remove('active')
        days28.classList.add('active')
    })
    days20.click()
}

const initTypeListener = () => {
    let typePicker = document.querySelector('#typePicker')
    let cookies = document.cookie.split(';').map(x => x = { name: x.split('=')[0].trim(),value:  x.split('=')[1] })
    cookies.get = (name) => {
        return cookies.filter(x => x.name === name)[0] ? cookies.filter(x => x.name === name)[0].value : undefined
    }

    if(cookies.get('typePicker'))
        for (option of typePicker.options) {
            if(cookies.get('typePicker').split(',').includes(option.value)){
                option.selected = false
            }
        }
    typePicker.addEventListener('change', () => {
        document.cookie = `typePicker=${[...typePicker.options].filter(x => !x.selected).map(x => x.value)}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
    })
}

const initCityListener = () => {
    let cityPicker = document.querySelector('#cityPicker')
    
    cityPicker.addEventListener('change', () => {
        document.location.replace(`/${cityPicker.value}`)
        
    }) 
}
function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
 }
const initSliders = () => {
    let cookies = document.cookie.split(';').map(x => x = { name: x.split('=')[0].trim(),value:  x.split('=')[1] })
    cookies.get = (name) => {
        return cookies.filter(x => x.name === name)[0] ? cookies.filter(x => x.name === name)[0].value : undefined
    }
   
    let priceSlider = document.querySelector('#priceRange')
    noUiSlider.create(priceSlider, {
        start: [35, 60],
        connect: true,
        range: {
            'min': 20,
            'max': 100
        },
        step: 5,
        margin: 10,
        format: {
            to: value => { return value },
            from: value => { return value },
        },
    });
    if(cookies.get('priceMin'))
        document.querySelector('#priceRange').noUiSlider.set([parseInt(cookies.get('priceMin')),null]) 
    if(cookies.get('priceMax'))
        document.querySelector('#priceRange').noUiSlider.set([null, parseInt(cookies.get('priceMax'))])
    let values = priceSlider.noUiSlider.get()
    document.querySelector('i#price').innerHTML = `${values[0]}-${values[1]} pln`
    
    priceSlider.noUiSlider.on('update', () => {
        let values = priceSlider.noUiSlider.get()
        document.cookie = `priceMin=${values[0]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        document.cookie = `priceMax=${values[1]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        if(values[0]===values[1])
            document.querySelector('i#price').innerHTML = `${values[0]} pln`
        else
            document.querySelector('i#price').innerHTML = `${values[0]}-${values[1]} pln`
    })
    let caloriesSlider = document.querySelector('#caloriesRange')
    noUiSlider.create(caloriesSlider, {
        start: [1500, 2500],
        connect: true,
        range: {
            'min': 1000,
            'max': 5000
        },
        step: 500,
        //margin: 500,
        format: {
            to: value => { return value },
            from: value => { return value },
        },
    })
    document.querySelector('#caloriesRange').noUiSlider.set([parseInt(cookies.get('caloriesMin')), parseInt(cookies.get('caloriesMax'))]) 
    values = caloriesSlider.noUiSlider.get()
    document.querySelector('i#calories').innerHTML = `${values[0]}-${values[1]} kcal`
    caloriesSlider.noUiSlider.on('update', () => {
        let values = caloriesSlider.noUiSlider.get()
        document.cookie = `caloriesMin=${values[0]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        document.cookie = `caloriesMax=${values[1]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        if(values[0]===values[1])
            document.querySelector('i#calories').innerHTML = `${values[0]} kcal`
        else
            document.querySelector('i#calories').innerHTML = `${values[0]}-${values[1]} kcal`
    })
}

const smallInit = () => {
    let width = document.body.clientWidth;
    let resize = () => {
        if(width < 576){
            let breakCol = document.querySelector('#breakCol')
            breakCol.classList.remove('border-right')
            breakCol.classList.remove('mb-3')
            breakCol.classList.remove('pb-3')
            breakCol.classList.add('border-bottom')
            breakCol.classList.add('mb-3')
            breakCol.classList.add('pb-3')
        }
    }
    resize()
    window.onresize = resize
    window.window.onorientationchange = resize
}