export const GITHUB = 'https://github.com/adityakumarsingh776199-alt'
// Paste your deployed demo links here (leave '' to show "Coming soon")
export const LIVE = { sales: '', house: '', churn: '' }
export const SRC = { sales: GITHUB, house: GITHUB, churn: GITHUB }

export const PROJECTS = [
  {
    slug: 'sales', title: 'Sales Dashboard', brand: 'SalesIQ', type: 'DASHBOARD', built: 'POWER BI, SQL, PYTHON, PANDAS',
    overview: 'Sales Dashboard turns raw order records into one clear view of the business. Data is cleaned with Python and SQL, modelled for reporting, and shown as KPI cards, regional and product breakdowns, and a trend with forecast. It grew out of the Power BI dashboards I built during my data analytics internship.',
    slides: [
      { fig: 'Fig. 01 — Revenue at a glance', title: 'Overview', cap: 'KPIs · Monthly trend', word: 'REVENUE', type: 'bars', kpis: [['Revenue', '₹4.82Cr'], ['Orders', '12.4K'], ['Avg order', '₹3,890'], ['Growth', '+18.2%']], data: [42, 55, 48, 63, 70, 66, 78, 85, 74, 92, 88, 100] },
      { fig: 'Fig. 02 — Where sales come from', title: 'Regions', cap: 'North · West · South · East', word: 'REGION', type: 'hbars', kpis: [['Top region', 'North'], ['Regions', '4'], ['Share', '38%'], ['YoY', '+12%']], data: [['North', 38], ['West', 27], ['South', 21], ['East', 14]] },
      { fig: 'Fig. 03 — What sells best', title: 'Products', cap: 'Category share of revenue', word: 'PRODUCT', type: 'hbars', kpis: [['Categories', '4'], ['Best seller', 'Electronics'], ['Returns', '3.1%'], ['Margin', '24%']], data: [['Electronics', 41], ['Fashion', 27], ['Home', 18], ['Grocery', 14]] },
      { fig: 'Fig. 04 — Looking ahead', title: 'Forecast', cap: 'Trend · Next 3 months', word: 'FORECAST', type: 'line', kpis: [['Next month', '₹46L'], ['Trend', 'Up'], ['Season peak', 'Oct–Nov'], ['Error', '±6%']], data: [30, 38, 35, 46, 52, 49, 60, 68, 64, 76, 82, 90] },
    ],
    notes: [['Clear KPI Summary', 'Revenue, orders, average order value and growth sit at the top, so the headline numbers are readable in seconds.'], ['Region-wise Breakdown', 'Compare regions side by side to see which markets drive sales and which ones need attention.'], ['Product Performance', 'Category share of revenue shows the best sellers and where the margin comes from.'], ['Trend and Forecast', 'A monthly trend with a short-term forecast helps plan stock and targets ahead of the season.']],
  },
  {
    slug: 'house', title: 'House Price Prediction', brand: 'PriceLens', type: 'ML MODEL', built: 'PYTHON, PANDAS, SCIKIT-LEARN',
    overview: 'House Price Prediction is a regression project that estimates a property’s price from its area, bedrooms, age and location. The data is cleaned and engineered in Pandas, several models are compared with cross-validation, and the best one powers a live estimator with feature importance and clear error metrics.',
    slides: [
      { fig: 'Fig. 01 — What drives the price', title: 'Feature importance', cap: 'Area · Bedrooms · Age', word: 'DRIVERS', type: 'hbars', kpis: [['R²', '0.91'], ['RMSE', '₹3.2L'], ['MAE', '₹2.4L'], ['Features', '8']], data: [['Area', 62], ['Bedrooms', 21], ['Age', 17]] },
      { fig: 'Fig. 02 — Price by locality', title: 'Localities', cap: 'Average price index', word: 'LOCALITY', type: 'bars', kpis: [['Localities', '12'], ['Highest', 'Sector 5'], ['Lowest', 'Old Town'], ['Spread', '2.1x']], data: [38, 52, 61, 45, 70, 83, 56, 40, 66, 90, 48, 74] },
      { fig: 'Fig. 03 — How close are we?', title: 'Actual vs predicted', cap: 'Test set fit', word: 'FIT', type: 'line', kpis: [['Test R²', '0.91'], ['Train R²', '0.94'], ['Outliers', '2.4%'], ['Folds', '5']], data: [20, 28, 35, 33, 46, 52, 58, 66, 72, 80, 86, 92] },
      { fig: 'Fig. 04 — Choosing the model', title: 'Model comparison', cap: 'Cross-validated R² × 100', word: 'MODELS', type: 'hbars', kpis: [['Models', '3'], ['Winner', 'Random Forest'], ['Tuning', 'Grid search'], ['Time', '4 s']], data: [['Linear', 78], ['Random Forest', 91], ['XGBoost', 90]] },
    ],
    notes: [['Live Price Estimator', 'Change area, bedrooms and age and the predicted price updates instantly.'], ['Locality Insights', 'Average prices by locality show how location changes the value of a similar home.'], ['Honest Model Fit', 'Actual vs predicted values on unseen data, so the accuracy is measured and not assumed.'], ['Model Comparison', 'Linear regression, Random Forest and XGBoost are compared, and the best performer is chosen.']],
  },
  {
    slug: 'churn', title: 'Customer Churn Prediction', brand: 'ChurnWatch', type: 'ML MODEL', built: 'PYTHON, TENSORFLOW, PANDAS',
    overview: 'Customer Churn Prediction scores how likely each customer is to leave and explains why. Usage and billing data is cleaned and encoded, a classifier is trained and compared against simpler baselines, and the output is a risk score with the top reasons, so a team can act before the customer is gone.',
    slides: [
      { fig: 'Fig. 01 — Who will leave?', title: 'Risk score', cap: 'Customer risk · 0–100', word: 'RISK', type: 'gauge', value: 78, kpis: [['Risk', '78'], ['Level', 'High'], ['Tenure', '4 mo'], ['Plan', 'Monthly']] },
      { fig: 'Fig. 02 — Why they leave', title: 'Top reasons', cap: 'Contribution to risk', word: 'REASONS', type: 'hbars', kpis: [['Reasons', '3'], ['Top', 'Contract'], ['Impact', '+34%'], ['Fixable', '2 of 3']], data: [['Month-to-month contract', 80], ['Low tenure', 55], ['High monthly charges', 35]] },
      { fig: 'Fig. 03 — Churn over time', title: 'By tenure', cap: 'Churn rate by months active', word: 'TENURE', type: 'bars', kpis: [['Overall', '26%'], ['0–6 mo', '48%'], ['2 yr+', '8%'], ['Segments', '6']], data: [90, 72, 60, 52, 44, 36, 30, 24, 18, 14, 11, 8] },
      { fig: 'Fig. 04 — Picking the classifier', title: 'Model comparison', cap: 'Accuracy %', word: 'MODELS', type: 'hbars', kpis: [['Accuracy', '86%'], ['ROC-AUC', '0.89'], ['Recall', '81%'], ['Models', '3']], data: [['Logistic', 79], ['Random Forest', 85], ['Neural network', 86]] },
    ],
    notes: [['Explainable Risk Score', 'Every customer gets a 0–100 risk score, so the team knows who to contact first.'], ['Reasons, Not Just Scores', 'The top drivers behind each score are shown, which makes the next action obvious.'], ['Tenure Patterns', 'Churn is highest in the first months, which helps focus onboarding and offers.'], ['Model Comparison', 'A neural network is compared with logistic regression and Random Forest on accuracy and ROC-AUC.']],
  },
]
