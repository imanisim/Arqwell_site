/* ARQWELL 101 SETTINGS — change only public values. Do not put API secrets in this file.
  This file sets appearance. Real published sessions can load from Supabase after setup.
  eventbriteUrl: optional VERIFIED public organizer or event listing URL.
  promoEnabled: default false; turn on when a real session and registration link are published.
  popupMaxPerMonth: 2–4; popupMinDaysBetween: recommended 5–10 days.
*/
window.ARQWELL_LEARNING_CONFIG = {
  programName: 'ARQWELL 101',
  eventbriteUrl: '',
  promoEnabled: false,
  popupMaxPerMonth: 2,
  popupMinDaysBetween: 7,
  demoSessions: [
    {id:'demo-learn-01',title:'Site Analysis: Reading the Ground',topic:'DESIGN + PLANNING',cost_type:'free',fee_label:'Free',date_label:'Date to be announced',summary:'A guided discussion of early site research, constraints, and environmental context.',registration_url:'',is_preview:true},
    {id:'demo-learn-02',title:'From Drawings to Decisions',topic:'DOCUMENTATION + BIM',cost_type:'paid',fee_label:'Paid workshop · price TBD',date_label:'Date to be announced',summary:'A hands-on look at translating research and drawing sets into coordinated project decisions.',registration_url:'',is_preview:true},
    {id:'demo-learn-03',title:'Healthy Homes: Material Choices',topic:'RESEARCH + WELLBEING',cost_type:'free',fee_label:'Free',date_label:'Date to be announced',summary:'Exploring material selection, household comfort, and healthier built environments.',registration_url:'',is_preview:true},
    {id:'demo-learn-04',title:'Finding AEC Research Funding',topic:'FUNDING + PRACTICE',cost_type:'paid',fee_label:'Paid workshop · price TBD',date_label:'Date to be announced',summary:'How to assess funding opportunities and design an actionable research proposal.',registration_url:'',is_preview:true}
  ]
};
