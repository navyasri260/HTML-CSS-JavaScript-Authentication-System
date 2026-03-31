async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Enter city name");
    return;
  }

  const apiKey = "474865648d56cb97bb2d763589fa49e9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data); // DEBUG

    // ✅ FIX HERE
    if (data.cod == 200 || data.cod == "200") {
      document.getElementById("result").innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡 ${data.main.temp} °C</p>
        <p>${data.weather[0].main}</p>
      `;
    } else {
      document.getElementById("result").innerHTML = data.message;
    }
  } catch (error) {
    document.getElementById("result").innerHTML = "Error fetching data";
  }
}