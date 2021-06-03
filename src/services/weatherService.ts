export default { 
    async getCityName(cityName: string) {
       const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=fr&units=metric&appid=1be2d16ca1e8f4250b426a94cbb888ca`)
       const data = await apiCall.json()
       console.log(data)
       return data;
    },

    async get5daysCityName(cityName: string) {
       const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=fr&units=metric&appid=1be2d16ca1e8f4250b426a94cbb888ca`)
       const data = await apiCall.json()
       console.log(data)
       return data;
    }
}