fetch("http://localhost:5000/stats")
  .then(res => res.json())
  .then(data => {

    console.log(data);

    const totals = {};

    data.forEach((item) => {

      const website = item.website;

      if (totals[website]) {
        totals[website] += item.duration;
      }
      else {
        totals[website] = item.duration;
      }

    });

    const labels = Object.keys(totals);

    const values = Object.values(totals);

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {

      type: "bar",

      data: {

        labels: labels,

        datasets: [{

          label: "Time Spent (seconds)",

          data: values

        }]

      }

    });

  })
  .catch(err => console.log(err));