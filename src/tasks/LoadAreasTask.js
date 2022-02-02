import legendItems from "../entities/LegendItems";

class LoadCountryTask {
  setState = null;

  load = (setState) => {
    this.setState = setState;

    fetch("https://kyupid-api.vercel.app/api/areas")
      .then((response) => {
        response.json().then((data) => {
          let areas = data.features;
          fetch("https://kyupid-api.vercel.app/api/users")
            .then((response) => {
              response.json().then((data2) => {
                let users = data2.users;
                this.#processCovidData(users, areas);
              });
            })
            .catch(function () {
              console.log("Request failed: Enable to fetch users");
            });
        });
      })
      .catch(function (error) {
        console.log("Request failed: Enable to fetch areas", error);
      });
  };

  #processCovidData = (users, areas) => {
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i];
      let usersCount = 0;
      let proUsers = 0;
      let maleUsers = 0;
      let femaleUsers = 0;
      const usersData = users.filter((user) => {
        if (area.properties.area_id === user.area_id) {
          usersCount++;
        }
        return area.properties.area_id === user.area_id;
      });

      usersData.forEach((user) => {
        if (user != null) {
          if (user.is_pro_user === true) {
            proUsers++;
          }
          if (user.gender === "M") {
            maleUsers++;
          } else {
            femaleUsers++;
          }
          area.properties.users = usersCount;
          area.properties.proUsers = proUsers;
          area.properties.maleUsers = maleUsers;
          area.properties.femaleUsers = femaleUsers;
        }
      });

      this.#setCountryColor(area);
    }
    this.setState(areas);
  };

  #setCountryColor = (area) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(area.properties.users)
    );

    if (legendItem != null) area.properties.color = legendItem.color;
  };
}

export default LoadCountryTask;
