//Below code thought inspiration was from intex site author: Adrien Miquel.
import React from 'react';
import axios from "axios";
import Pie from 'react-chartjs-2';
import ChartDonut from '../PieChart/ChartDonut';

class HomePage extends React.Component {
   
dataSource = {
  labels: [],
  datasets: [{
      data: [],
      backgroundColor: [
        '#3FCD56',
        '#DF3384',
        '#C632EB',
        '#FD6319',
        '#ED3A39',
        '#DF3D56',
        '#CDC319',
      ],
      label: ''
  }]
};

state = { dataSource: {labels: [],
    datasets: [{
        data: [],
        backgroundColor: [
            '#3FCD56',
    '#DF3384',
    '#C632EB',
    '#FD6319',
    '#ED3A39',
    '#DF3D56',
    '#CDC319',
        ],
        label: ''
    }]}
    };
componentDidMount()
 {
    axios.get("http://localhost:3000/data.json")
      .then(res => {
          res=JSON.parse(JSON.stringify(res))
          for(var i = 0; i < res.data.myBudget.length; i++){
              this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
              this.dataSource.labels[i] = res.data.myBudget[i].title;
            }
              this.setState(currentState =>({dataSource: this.dataSource}));
        })
      }

      render() {
  return (
    <main  role="main" aria-labelledby="main"  className="container center">
        
        
        <div id = "main" className="page-area">
            <section className="text-box">
                <h1>Stay on track </h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </section>
            <section className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </section>
            <section className="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
            </section>
            <section className="text-box">
                <h1>Free</h1>
                <p>
                    This app is free!!! And you are the only one holding your data!
                </p>
            </section>
            <section className="text-box">
                <h1>Stay on track</h1>
                <p>
                    Do you know where you are spending your money? If you really stop to track it down,
                    you would get surprised! Proper budget management depends on real data... and this
                    app will help you with that!
                </p>
            </section>
            <section className="text-box">
                <h1>Alerts</h1>
                <p>
                    What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                </p>
            </section>
            <section className="text-box">
                <h1>Results</h1>
                <p>
                    People who stick to a financial plan, budgeting every expense, get out of debt faster!
                    Also, they to live happier lives... since they expend without guilt or fear... 
                    because they know it is all good and accounted for.
                </p>
                
            </section>
            <section className="text-box">
                <h1>Chart</h1>
                <p>
                    <Pie data={this.state.dataSource}/>  
                </p>
                
            </section>
            <ChartDonut/>
        </div>

    </main>
  );
}
}

export default HomePage;
