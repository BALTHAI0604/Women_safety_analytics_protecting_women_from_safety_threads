/**
 * Comprehensive Dataset of All 28 States & 8 Union Territories of India
 * Including major districts, coordinates, and emergency helplines.
 * Prominently features Tamil Nadu (Karur, Chennai, Coimbatore, etc.) and all Indian regions.
 */

export const POPULAR_LOCATIONS = [
  { name: 'Karur', state: 'Tamil Nadu', country: 'India', lat: 10.9601, lon: 78.0766, isHighlight: true },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lon: 80.2707 },
  { name: 'Bengaluru', state: 'Karnataka', country: 'India', lat: 12.9716, lon: 77.5946 },
  { name: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0760, lon: 72.8777 },
  { name: 'Delhi NCR', state: 'Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  { name: 'Coimbatore', state: 'Tamil Nadu', country: 'India', lat: 11.0168, lon: 76.9558 },
  { name: 'Madurai', state: 'Tamil Nadu', country: 'India', lat: 9.9252, lon: 78.1198 },
  { name: 'Tiruchirappalli', state: 'Tamil Nadu', country: 'India', lat: 10.7905, lon: 78.7047 },
  { name: 'Hyderabad', state: 'Telangana', country: 'India', lat: 17.3850, lon: 78.4867 },
  { name: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lon: 88.3639 },
  { name: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lon: 73.8567 },
  { name: 'Kochi', state: 'Kerala', country: 'India', lat: 9.9312, lon: 76.2673 }
];

export const INDIA_STATES_DATA = [
  {
    state: 'Tamil Nadu',
    code: 'TN',
    policeHelpline: '100 / 112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Karur', lat: 10.9601, lon: 78.0766, desc: 'Textile City, Central Tamil Nadu', isSpecial: true },
      { name: 'Chennai', lat: 13.0827, lon: 80.2707, desc: 'State Capital & Metropolitan' },
      { name: 'Coimbatore', lat: 11.0168, lon: 76.9558, desc: 'Manchester of South India' },
      { name: 'Madurai', lat: 9.9252, lon: 78.1198, desc: 'Temple City & Cultural Hub' },
      { name: 'Tiruchirappalli (Trichy)', lat: 10.7905, lon: 78.7047, desc: 'Central Transit & Rockfort City' },
      { name: 'Salem', lat: 11.6643, lon: 78.1460, desc: 'Steel City & Western Hub' },
      { name: 'Tiruppur', lat: 11.1085, lon: 77.3411, desc: 'Knitwear Capital' },
      { name: 'Erode', lat: 11.3410, lon: 77.7172, desc: 'Turmeric City' },
      { name: 'Tirunelveli', lat: 8.7139, lon: 77.7567, desc: 'Southern Cultural Hub' },
      { name: 'Vellore', lat: 12.9165, lon: 79.1325, desc: 'Fort City & Medical Hub' },
      { name: 'Thanjavur', lat: 10.7870, lon: 79.1378, desc: 'Delta Agricultural & Heritage City' },
      { name: 'Dindigul', lat: 10.3673, lon: 77.9803, desc: 'Lock City & Foothills of Kodaikanal' },
      { name: 'Thoothukudi (Tuticorin)', lat: 8.7642, lon: 78.1348, desc: 'Pearl City & Port Hub' },
      { name: 'Kanyakumari (Nagercoil)', lat: 8.1833, lon: 77.4119, desc: 'Southernmost Tip of India' },
      { name: 'Kanchipuram', lat: 12.8342, lon: 79.7036, desc: 'Silk City' },
      { name: 'Tiruvannamalai', lat: 12.2253, lon: 79.0747, desc: 'Spiritual City' },
      { name: 'Hosur (Krishnagiri)', lat: 12.7409, lon: 77.8253, desc: 'Industrial Corridor' },
      { name: 'Namakkal', lat: 11.2189, lon: 78.1674, desc: 'Poultry & Transport Hub' },
      { name: 'Cuddalore', lat: 11.7480, lon: 79.7714, desc: 'Coastal District' },
      { name: 'Villupuram', lat: 11.9401, lon: 79.4861, desc: 'Central Transit Hub' },
      { name: 'Nilgiris (Ooty)', lat: 11.4102, lon: 76.6950, desc: 'Hill Station & Biosphere' },
      { name: 'Pudukkottai', lat: 10.3797, lon: 78.8208, desc: 'Heritage District' },
      { name: 'Ramanathapuram', lat: 9.3639, lon: 78.8395, desc: 'Coastal & Island District' },
      { name: 'Sivaganga', lat: 9.8433, lon: 78.4809, desc: 'Chettinad Cultural District' },
      { name: 'Theni', lat: 10.0104, lon: 77.4768, desc: 'Western Ghats Valley' },
      { name: 'Dharmapuri', lat: 12.1211, lon: 78.1582, desc: 'Northern Agricultural District' },
      { name: 'Perambalur', lat: 11.2342, lon: 78.8817, desc: 'Central Region' },
      { name: 'Ariyalur', lat: 11.1401, lon: 79.0782, desc: 'Cement Hub' },
      { name: 'Kallakurichi', lat: 11.7383, lon: 78.9639, desc: 'Agricultural District' },
      { name: 'Ranipet', lat: 12.9298, lon: 79.3330, desc: 'Leather & Industrial Hub' },
      { name: 'Tenkasi', lat: 8.9594, lon: 77.3152, desc: 'Courtallam Falls Gateway' },
      { name: 'Tirupattur', lat: 12.4958, lon: 78.5678, desc: 'Sandalwood City' },
      { name: 'Chengalpattu', lat: 12.6841, lon: 79.9836, desc: 'IT & Auto Corridor' },
      { name: 'Nagapattinam', lat: 10.7672, lon: 79.8449, desc: 'Delta Coastal District' },
      { name: 'Mayiladuthurai', lat: 11.1075, lon: 79.6524, desc: 'Temple & Heritage Town' }
    ]
  },
  {
    state: 'Karnataka',
    code: 'KA',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Bengaluru (Bangalore)', lat: 12.9716, lon: 77.5946, desc: 'State Capital & Silicon Valley' },
      { name: 'Mysuru (Mysore)', lat: 12.2958, lon: 76.6394, desc: 'Heritage & Palace City' },
      { name: 'Mangaluru (Mangalore)', lat: 12.9141, lon: 74.8560, desc: 'Coastal Port City' },
      { name: 'Hubballi-Dharwad', lat: 15.3647, lon: 75.1240, desc: 'Commercial Capital of North Karnataka' },
      { name: 'Belagavi (Belgaum)', lat: 15.8497, lon: 74.4977, desc: 'Border District & Sugar Hub' },
      { name: 'Kalaburagi (Gulbarga)', lat: 17.3297, lon: 76.8343, desc: 'Sun City & Educational Center' },
      { name: 'Ballari (Bellary)', lat: 15.1394, lon: 76.9214, desc: 'Mining & Steel City' },
      { name: 'Davanagere', lat: 14.4644, lon: 75.9218, desc: 'Textile & Butter Dosa Capital' },
      { name: 'Shivamogga (Shimoga)', lat: 13.9299, lon: 75.5681, desc: 'Gateway of Malnad' },
      { name: 'Tumakuru (Tumkur)', lat: 13.3409, lon: 77.1006, desc: 'Industrial Hub' },
      { name: 'Udupi', lat: 13.3409, lon: 74.7421, desc: 'Temple City & Coastal Hub' },
      { name: 'Hassan', lat: 13.0072, lon: 76.1030, desc: 'Hoysala Architecture Gateway' }
    ]
  },
  {
    state: 'Maharashtra',
    code: 'MH',
    policeHelpline: '112',
    womenHelpline: '1091 / 103',
    districts: [
      { name: 'Mumbai', lat: 19.0760, lon: 72.8777, desc: 'Financial Capital of India' },
      { name: 'Pune', lat: 18.5204, lon: 73.8567, desc: 'Oxford of the East & Auto Hub' },
      { name: 'Nagpur', lat: 21.1458, lon: 79.0882, desc: 'Orange City & Winter Capital' },
      { name: 'Thane', lat: 19.2183, lon: 72.9781, desc: 'City of Lakes' },
      { name: 'Nashik', lat: 19.9975, lon: 73.7898, desc: 'Wine Capital of India' },
      { name: 'Chhatrapati Sambhaji Nagar (Aurangabad)', lat: 19.8762, lon: 75.3433, desc: 'Tourism Capital' },
      { name: 'Navi Mumbai', lat: 19.0330, lon: 73.0297, desc: 'Planned Metropolis' },
      { name: 'Solapur', lat: 17.6599, lon: 75.9064, desc: 'Textile & Solapuri Chaddar' },
      { name: 'Kolhapur', lat: 16.7050, lon: 74.2433, desc: 'Historical City' },
      { name: 'Amravati', lat: 20.9374, lon: 77.7796, desc: 'Vidarbha Educational Hub' }
    ]
  },
  {
    state: 'Delhi (National Capital Region)',
    code: 'DL',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'New Delhi (Central)', lat: 28.6139, lon: 77.2090, desc: 'National Capital Territory' },
      { name: 'South Delhi', lat: 28.5355, lon: 77.2001, desc: 'Hauz Khas, Saket & Greater Kailash' },
      { name: 'North Delhi', lat: 28.7041, lon: 77.1025, desc: 'Civil Lines & DU Campus' },
      { name: 'Dwarka (South West)', lat: 28.5921, lon: 77.0460, desc: 'Sub-city & Diplomatic Enclave' },
      { name: 'Rohini (North West)', lat: 28.7383, lon: 77.1122, desc: 'Major Residential & Commercial Zone' },
      { name: 'Noida (NCR)', lat: 28.5355, lon: 77.3910, desc: 'IT & Industrial Hub' },
      { name: 'Gurugram (NCR)', lat: 28.4595, lon: 77.0266, desc: 'Millennium Cyber City' },
      { name: 'Faridabad (NCR)', lat: 28.4089, lon: 77.3178, desc: 'Industrial Metro Zone' },
      { name: 'Ghaziabad (NCR)', lat: 28.6692, lon: 77.4538, desc: 'Gateway of UP' }
    ]
  },
  {
    state: 'Kerala',
    code: 'KL',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366, desc: 'State Capital & IT Hub' },
      { name: 'Kochi (Ernakulam)', lat: 9.9312, lon: 76.2673, desc: 'Commercial Capital & Queen of Arabian Sea' },
      { name: 'Kozhikode (Calicut)', lat: 11.2588, lon: 75.7804, desc: 'City of Spices' },
      { name: 'Thrissur', lat: 10.5276, lon: 76.2144, desc: 'Cultural Capital of Kerala' },
      { name: 'Kollam', lat: 8.8932, lon: 76.6141, desc: 'Cashew Capital' },
      { name: 'Palakkad', lat: 10.7867, lon: 76.6548, desc: 'Granary of Kerala' },
      { name: 'Alappuzha (Alleppey)', lat: 9.4981, lon: 76.3388, desc: 'Venice of the East' },
      { name: 'Kannur', lat: 11.8745, lon: 75.3704, desc: 'Crown of Kerala' },
      { name: 'Kottayam', lat: 9.5916, lon: 76.5222, desc: 'City of Letters' },
      { name: 'Malappuram', lat: 11.0732, lon: 76.0740, desc: 'Hills & Heritage District' }
    ]
  },
  {
    state: 'Telangana',
    code: 'TS',
    policeHelpline: '112 / 100',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, desc: 'Cyberabad & Pearl City' },
      { name: 'Warangal', lat: 17.9689, lon: 79.5941, desc: 'Kakatiya Heritage Capital' },
      { name: 'Nizamabad', lat: 18.6725, lon: 78.0941, desc: 'North Telangana Agricultural Hub' },
      { name: 'Karimnagar', lat: 18.4386, lon: 79.1288, desc: 'Granite & Agricultural Hub' },
      { name: 'Khammam', lat: 17.2473, lon: 80.1514, desc: 'Coal & Mineral Belt' },
      { name: 'Ramagundam', lat: 18.7557, lon: 79.5167, desc: 'City of Energy' }
    ]
  },
  {
    state: 'Andhra Pradesh',
    code: 'AP',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Visakhapatnam (Vizag)', lat: 17.6868, lon: 83.2185, desc: 'City of Destiny & Naval Hub' },
      { name: 'Vijayawada', lat: 16.5062, lon: 80.6480, desc: 'Commercial Capital & Krishna River City' },
      { name: 'Guntur', lat: 16.3067, lon: 80.4365, desc: 'Chilli & Education Hub' },
      { name: 'Tirupati', lat: 13.6288, lon: 79.4192, desc: 'Spiritual Capital' },
      { name: 'Nellore', lat: 14.4426, lon: 79.9865, desc: 'Coastal Aquaculture Hub' },
      { name: 'Kurnool', lat: 15.8281, lon: 78.0373, desc: 'Gateway to Rayalaseema' },
      { name: 'Kakinada', lat: 16.9891, lon: 82.2475, desc: 'Deepwater Port & Fertilizer City' },
      { name: 'Rajahmundry', lat: 17.0005, lon: 81.8040, desc: 'Cultural Capital of Andhra' }
    ]
  },
  {
    state: 'Gujarat',
    code: 'GJ',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, desc: 'Heritage Mega City & Textile Hub' },
      { name: 'Surat', lat: 21.1702, lon: 72.8311, desc: 'Diamond & Silk City' },
      { name: 'Vadodara (Baroda)', lat: 22.3072, lon: 73.1812, desc: 'Cultural Capital of Gujarat' },
      { name: 'Rajkot', lat: 22.3039, lon: 70.8022, desc: 'Saurashtra Hub' },
      { name: 'Gandhinagar', lat: 23.2156, lon: 72.6369, desc: 'State Capital & GIFT City' },
      { name: 'Bhavnagar', lat: 21.7645, lon: 72.1519, desc: 'Coastal & Ship Recycling Hub' },
      { name: 'Jamnagar', lat: 22.4707, lon: 70.0577, desc: 'Oil City of India' }
    ]
  },
  {
    state: 'Rajasthan',
    code: 'RJ',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Jaipur', lat: 26.9124, lon: 75.7873, desc: 'Pink City & State Capital' },
      { name: 'Jodhpur', lat: 26.2389, lon: 73.0243, desc: 'Blue City & Sun City' },
      { name: 'Udaipur', lat: 24.5854, lon: 73.7125, desc: 'City of Lakes' },
      { name: 'Kota', lat: 25.2138, lon: 75.8648, desc: 'Education City of India' },
      { name: 'Bikaner', lat: 28.0229, lon: 73.3119, desc: 'Camel Country & Sweets Hub' },
      { name: 'Ajmer', lat: 26.4499, lon: 74.6399, desc: 'Heart of Rajasthan' }
    ]
  },
  {
    state: 'Uttar Pradesh',
    code: 'UP',
    policeHelpline: '112',
    womenHelpline: '1090 / 181',
    districts: [
      { name: 'Lucknow', lat: 26.8467, lon: 80.9462, desc: 'City of Nawabs & State Capital' },
      { name: 'Kanpur', lat: 26.4499, lon: 80.3319, desc: 'Industrial & Leather Capital' },
      { name: 'Varanasi (Kashi)', lat: 25.3176, lon: 82.9739, desc: 'Spiritual Capital of India' },
      { name: 'Agra', lat: 27.1767, lon: 78.0081, desc: 'Taj City & Tourism Wonder' },
      { name: 'Prayagraj (Allahabad)', lat: 25.4358, lon: 81.8463, desc: 'Triveni Sangam & Judicial Hub' },
      { name: 'Meerut', lat: 28.9845, lon: 77.7064, desc: 'Sports Goods Capital' },
      { name: 'Bareilly', lat: 28.3670, lon: 79.4304, desc: 'Zari Zardozi City' },
      { name: 'Aligarh', lat: 27.8974, lon: 78.0880, desc: 'Lock City & University Hub' },
      { name: 'Gorakhpur', lat: 26.7606, lon: 83.3732, desc: 'Eastern UP Hub' },
      { name: 'Ayodhya', lat: 26.7922, lon: 82.1998, desc: 'Heritage & Pilgrimage City' }
    ]
  },
  {
    state: 'West Bengal',
    code: 'WB',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Kolkata', lat: 22.5726, lon: 88.3639, desc: 'City of Joy & State Capital' },
      { name: 'Howrah', lat: 22.5958, lon: 88.2636, desc: 'Industrial Twin City' },
      { name: 'Siliguri', lat: 26.7271, lon: 88.3953, desc: 'Gateway to North East & Himalayas' },
      { name: 'Durgapur', lat: 23.5204, lon: 87.3119, desc: 'Steel City of Bengal' },
      { name: 'Asansol', lat: 23.6739, lon: 86.9524, desc: 'Coal & Heavy Industry City' },
      { name: 'Darjeeling', lat: 27.0410, lon: 88.2663, desc: 'Queen of the Hills' }
    ]
  },
  {
    state: 'Punjab',
    code: 'PB',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Ludhiana', lat: 30.9010, lon: 75.8573, desc: 'Industrial Capital of Punjab' },
      { name: 'Amritsar', lat: 31.6340, lon: 74.8723, desc: 'Golden Temple & Holy City' },
      { name: 'Jalandhar', lat: 31.3260, lon: 75.5762, desc: 'Sports Capital of India' },
      { name: 'Patiala', lat: 30.3398, lon: 76.3869, desc: 'Royal City' },
      { name: 'Mohali (SAS Nagar)', lat: 30.7046, lon: 76.7179, desc: 'IT & Cricket Stadium Hub' },
      { name: 'Bathinda', lat: 30.2110, lon: 74.9455, desc: 'Lakes City of Punjab' }
    ]
  },
  {
    state: 'Haryana',
    code: 'HR',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Gurugram', lat: 28.4595, lon: 77.0266, desc: 'Financial & Tech Mega Center' },
      { name: 'Faridabad', lat: 28.4089, lon: 77.3178, desc: 'Largest Industrial City' },
      { name: 'Panipat', lat: 29.3909, lon: 76.9635, desc: 'City of Weavers' },
      { name: 'Ambala', lat: 30.3782, lon: 76.7767, desc: 'Twin City & Air Force Hub' },
      { name: 'Rohtak', lat: 28.8955, lon: 76.6066, desc: 'Education & Cloth Market City' },
      { name: 'Karnal', lat: 29.6857, lon: 76.9905, desc: 'Rice Bowl of India' }
    ]
  },
  {
    state: 'Bihar',
    code: 'BR',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Patna', lat: 25.5941, lon: 85.1376, desc: 'State Capital & Ancient Pataliputra' },
      { name: 'Gaya', lat: 24.7914, lon: 85.0002, desc: 'Bodh Gaya & Pilgrimage Center' },
      { name: 'Bhagalpur', lat: 25.2425, lon: 86.9842, desc: 'Silk City of Bihar' },
      { name: 'Muzaffarpur', lat: 26.1209, lon: 85.3647, desc: 'Litchi Capital' },
      { name: 'Purnia', lat: 25.7771, lon: 87.4753, desc: 'Commercial Capital of North Bihar' },
      { name: 'Darbhanga', lat: 26.1542, lon: 85.8918, desc: 'Cultural Capital of Mithila' }
    ]
  },
  {
    state: 'Madhya Pradesh',
    code: 'MP',
    policeHelpline: '112 / 100',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Indore', lat: 22.7196, lon: 75.8577, desc: 'Cleanest City of India & Food Capital' },
      { name: 'Bhopal', lat: 23.2599, lon: 77.4126, desc: 'City of Lakes & State Capital' },
      { name: 'Jabalpur', lat: 23.1815, lon: 79.9864, desc: 'Marble City & High Court Seat' },
      { name: 'Gwalior', lat: 26.2183, lon: 78.1828, desc: 'City of Music & Forts' },
      { name: 'Ujjain', lat: 23.1765, lon: 75.7885, desc: 'Mahakal City & Spiritual Hub' }
    ]
  },
  {
    state: 'Odisha',
    code: 'OD',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Bhubaneswar', lat: 20.2961, lon: 85.8245, desc: 'Temple City & Smart Capital' },
      { name: 'Cuttack', lat: 20.4625, lon: 85.8828, desc: 'Silver City & Millenium City' },
      { name: 'Rourkela', lat: 22.2604, lon: 84.8536, desc: 'Steel City of Odisha' },
      { name: 'Puri', lat: 19.8135, lon: 85.8312, desc: 'Holy Dham of Jagannath' },
      { name: 'Berhampur', lat: 19.3150, lon: 84.7941, desc: 'Silk City of Odisha' }
    ]
  },
  {
    state: 'Assam',
    code: 'AS',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Guwahati', lat: 26.1445, lon: 91.7362, desc: 'Gateway to North East India' },
      { name: 'Silchar', lat: 24.8333, lon: 92.7789, desc: 'Barak Valley Hub' },
      { name: 'Dibrugarh', lat: 27.4728, lon: 94.9120, desc: 'Tea City of India' },
      { name: 'Jorhat', lat: 26.7509, lon: 94.2037, desc: 'Cultural Capital of Assam' },
      { name: 'Tezpur', lat: 26.6528, lon: 92.7926, desc: 'City of Eternal Romance' }
    ]
  },
  {
    state: 'Goa',
    code: 'GA',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Panaji', lat: 15.4909, lon: 73.8278, desc: 'State Capital & Coastal City' },
      { name: 'Margao', lat: 15.2832, lon: 73.9862, desc: 'Commercial Capital of Goa' },
      { name: 'Vasco da Gama', lat: 15.3982, lon: 73.8113, desc: 'Port City & Airport Hub' },
      { name: 'Mapusa', lat: 15.5937, lon: 73.8143, desc: 'North Goa Market Hub' }
    ]
  },
  {
    state: 'Jammu & Kashmir (UT)',
    code: 'JK',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Srinagar', lat: 34.0837, lon: 74.7973, desc: 'Summer Capital & Paradise on Earth' },
      { name: 'Jammu', lat: 32.7266, lon: 74.8570, desc: 'Winter Capital & City of Temples' },
      { name: 'Anantnag', lat: 33.7311, lon: 75.1522, desc: 'Valley of Springs' },
      { name: 'Baramulla', lat: 34.1980, lon: 74.3639, desc: 'Northern Gateway' }
    ]
  },
  {
    state: 'Himachal Pradesh',
    code: 'HP',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Shimla', lat: 31.1048, lon: 77.1734, desc: 'Queen of Hills & State Capital' },
      { name: 'Dharamshala', lat: 32.2190, lon: 76.3234, desc: 'Kangra Valley & Dalai Lama Seat' },
      { name: 'Manali (Kullu)', lat: 32.2432, lon: 77.1892, desc: 'Valley of the Gods' },
      { name: 'Solan', lat: 30.9045, lon: 77.0967, desc: 'Mushroom City of India' }
    ]
  },
  {
    state: 'Uttarakhand',
    code: 'UK',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Dehradun', lat: 30.3165, lon: 78.0322, desc: 'State Capital & Doon Valley' },
      { name: 'Haridwar', lat: 29.9457, lon: 78.1642, desc: 'Holy Gateway of Ganga' },
      { name: 'Rishikesh', lat: 30.0869, lon: 78.2676, desc: 'Yoga Capital of the World' },
      { name: 'Haldwani (Nainital)', lat: 29.2183, lon: 79.5130, desc: 'Gateway to Kumaon' }
    ]
  },
  {
    state: 'Jharkhand',
    code: 'JH',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Ranchi', lat: 23.3441, lon: 85.3096, desc: 'City of Waterfalls & Capital' },
      { name: 'Jamshedpur', lat: 22.8046, lon: 86.2029, desc: 'Steel City & Tata Hub' },
      { name: 'Dhanbad', lat: 23.7957, lon: 86.4304, desc: 'Coal Capital of India' },
      { name: 'Bokaro', lat: 23.6693, lon: 86.1511, desc: 'Steel City' }
    ]
  },
  {
    state: 'Chhattisgarh',
    code: 'CG',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Raipur', lat: 21.2514, lon: 81.6296, desc: 'Capital & Commercial Center' },
      { name: 'Bhilai-Durg', lat: 21.1938, lon: 81.3509, desc: 'Steel Plant & Education City' },
      { name: 'Bilaspur', lat: 22.0797, lon: 82.1409, desc: 'Judicial Capital of Chhattisgarh' }
    ]
  },
  {
    state: 'Puducherry (UT)',
    code: 'PY',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Puducherry (Pondicherry)', lat: 11.9416, lon: 79.8083, desc: 'French Riviera of the East' },
      { name: 'Karaikal', lat: 10.9254, lon: 79.8380, desc: 'Coastal Heritage Port' }
    ]
  },
  {
    state: 'Chandigarh (UT)',
    code: 'CH',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Chandigarh City', lat: 30.7333, lon: 76.7794, desc: 'The City Beautiful' }
    ]
  },
  {
    state: 'Tripura',
    code: 'TR',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Agartala', lat: 23.8315, lon: 91.2868, desc: 'Capital & Ujjayanta Palace City' }
    ]
  },
  {
    state: 'Meghalaya',
    code: 'ML',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Shillong', lat: 25.5788, lon: 91.8933, desc: 'Scotland of the East' }
    ]
  },
  {
    state: 'Manipur',
    code: 'MN',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Imphal', lat: 24.8170, lon: 93.9368, desc: 'Jeweled Land Capital' }
    ]
  },
  {
    state: 'Nagaland',
    code: 'NL',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Kohima', lat: 25.6751, lon: 94.1086, desc: 'Hornbill Capital' },
      { name: 'Dimapur', lat: 25.9068, lon: 93.7271, desc: 'Commercial Gateway' }
    ]
  },
  {
    state: 'Mizoram',
    code: 'MZ',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Aizawl', lat: 23.7271, lon: 92.7176, desc: 'City on the Hills' }
    ]
  },
  {
    state: 'Sikkim',
    code: 'SK',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Gangtok', lat: 27.3389, lon: 88.6065, desc: 'Kanchenjunga Capital' }
    ]
  },
  {
    state: 'Arunachal Pradesh',
    code: 'AR',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Itanagar', lat: 27.0844, lon: 93.6053, desc: 'Land of the Dawn-lit Mountains' }
    ]
  },
  {
    state: 'Ladakh (UT)',
    code: 'LA',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Leh', lat: 34.1526, lon: 77.5771, desc: 'Land of High Passes' }
    ]
  },
  {
    state: 'Andaman & Nicobar Islands (UT)',
    code: 'AN',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Port Blair', lat: 11.6234, lon: 92.7265, desc: 'Bay Islands Capital' }
    ]
  },
  {
    state: 'Dadra & Nagar Haveli and Daman & Diu (UT)',
    code: 'DN',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Daman & Silvassa', lat: 20.3974, lon: 72.8328, desc: 'Coastal Union Territory' }
    ]
  },
  {
    state: 'Lakshadweep (UT)',
    code: 'LD',
    policeHelpline: '112',
    womenHelpline: '1091 / 181',
    districts: [
      { name: 'Kavaratti', lat: 10.5667, lon: 72.6417, desc: 'Archipelago Capital' }
    ]
  }
];

export const GLOBAL_HUBS = [
  { name: 'New York', state: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060, desc: 'Major Global Hub' },
  { name: 'London', state: 'Greater London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278, desc: 'Major Global Hub' },
  { name: 'Toronto', state: 'Ontario', country: 'Canada', lat: 43.6532, lon: -79.3832, desc: 'Major Global Hub' },
  { name: 'Sydney', state: 'NSW', country: 'Australia', lat: -33.8688, lon: 151.2093, desc: 'Major Global Hub' },
  { name: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, desc: 'Major Global Hub' },
  { name: 'Singapore', state: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198, desc: 'Major Global Hub' },
  { name: 'Tokyo', state: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, desc: 'Major Global Hub' }
];

/**
 * Fast search helper that looks across all Indian states, districts, and global hubs
 */
export function searchLocations(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];

  const results = [];

  // 1. Search in Indian states and districts
  for (const stateObj of INDIA_STATES_DATA) {
    const stateMatches = stateObj.state.toLowerCase().includes(q) || stateObj.code.toLowerCase() === q;
    
    for (const dist of stateObj.districts) {
      const distMatches = dist.name.toLowerCase().includes(q) || (dist.desc && dist.desc.toLowerCase().includes(q));
      
      if (distMatches || stateMatches) {
        results.push({
          city: dist.name,
          district: dist.name,
          state: stateObj.state,
          stateCode: stateObj.code,
          country: 'India',
          latitude: dist.lat,
          longitude: dist.lon,
          desc: dist.desc || `${dist.name}, ${stateObj.state}`,
          policeHelpline: stateObj.policeHelpline,
          womenHelpline: stateObj.womenHelpline,
          isSpecial: dist.isSpecial || false,
          score: dist.name.toLowerCase() === q ? 100 : dist.name.toLowerCase().startsWith(q) ? 80 : 50
        });
      }
    }
  }

  // 2. Search in Global Hubs
  for (const hub of GLOBAL_HUBS) {
    if (hub.name.toLowerCase().includes(q) || hub.country.toLowerCase().includes(q) || hub.state.toLowerCase().includes(q)) {
      results.push({
        city: hub.name,
        district: hub.name,
        state: hub.state,
        country: hub.country,
        latitude: hub.lat,
        longitude: hub.lon,
        desc: hub.desc || `${hub.name}, ${hub.country}`,
        policeHelpline: '911 / 999',
        womenHelpline: 'Emergency Services',
        isSpecial: false,
        score: hub.name.toLowerCase() === q ? 95 : 40
      });
    }
  }

  // Sort by relevance score
  return results.sort((a, b) => b.score - a.score);
}
