document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    initSliders()
    smallInit()
    initCityListener()
    initTypeListener()
    setValuesByCookies()
}
const setValuesByCookies = () => {
    let cookies = document.cookie.split(';').map(x => x = { name: x.split('=')[0].trim(),value:  x.split('=')[1] })
    cookies.get = (name) => {
        return cookies.filter(x => x.name === name)[0].value
    }
    console.log([parseInt(cookies.get('priceMin')), parseInt(cookies.get('priceMax'))])
    document.querySelector('#priceRange').noUiSlider.set([parseInt(cookies.get('priceMin')), parseInt(cookies.get('priceMax'))])
    
}
const initTypeListener = () => {
    let typePicker = document.querySelector('#typePicker')
    typePicker.addEventListener('change', () => {
        document.cookie = `typePicker=${[...typePicker.options].filter(x => x.selected).map(x => x.value)}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
    })
}

/* 
    dietTypes = [...document.querySelector('#typePicker').options].filter(x => x.selected).map(x => x.value)
        priceMin = document.querySelector('#priceRange').noUiSlider.get()[0]
        priceMax = document.querySelector('#priceRange').noUiSlider.get()[1]
        caloriesMin = document.querySelector('#caloriesRange').noUiSlider.get()[0]
        caloriesMax = document.querySelector('#caloriesRange').noUiSlider.get()[1]
        document.cookie = `dietTypes=${dietTypes.join()};priceMin=${priceMin};priceMax=${priceMax};caloriesMin=${caloriesMin};caloriesMax=${caloriesMax}`

*/
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
    let values = priceSlider.noUiSlider.get()
    document.querySelector('i#price').innerHTML = `${values[0]}-${values[1]} pln`
    priceSlider.noUiSlider.on('update', () => {
        let values = priceSlider.noUiSlider.get()
        document.cookie = `priceMin=${values[0]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        document.cookie = `priceMax=${values[1]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        console.log(document.cookie)
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
    });
    values = caloriesSlider.noUiSlider.get()
    document.querySelector('i#calories').innerHTML = `${values[0]}-${values[1]} kcal`
    caloriesSlider.noUiSlider.on('update', () => {
        let values = caloriesSlider.noUiSlider.get()
        document.cookie = `caloriesMin=${values[0]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        document.cookie = `caloriesMax=${values[1]}; expires=Fri, 3 Aug 2020 20:47:11 UTC; path=/`
        console.log(document.cookie)
        if(values[0]===values[1])
            document.querySelector('i#calories').innerHTML = `${values[0]} kcal`
        else
            document.querySelector('i#calories').innerHTML = `${values[0]}-${values[1]} kcal`
    })
}

const smallInit = () => {
    let width = document.body.clientWidth;
    if(width < 576){
        let breakCol = document.querySelector('#breakCol')
        breakCol.classList.remove('border-right-teal')
        breakCol.classList.remove('mb-3')
        breakCol.classList.remove('pb-3')
        breakCol.classList.add('border-bottom-teal')
        breakCol.classList.add('mb-3')
        breakCol.classList.add('pb-3')
    }
}