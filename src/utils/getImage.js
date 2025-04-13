function getCategoryImage(category) {
  let images = [];

  switch (category) {
    case "Weekend Getaways":
      images = [
        "/events/weekend/1.jpg",
        "/events/weekend/2.jpg",
        "/events/weekend/3.jpg",
      ];
      break;
    case "Adventure & Treks":
      images = [
        "/events/adventure/1.jpg",
        "/events/adventure/2.jpg",
        "/events/adventure/3.jpg",
      ];
      break;
    case "Camping & Bonfire Nights":
      images = [
        "/events/camping/1.jpg",
        "/events/camping/2.jpg",
        "/events/camping/3.jpg",
      ];
      break;
    case "Beach & Island Escapes":
      images = [
        "/events/beach/1.jpg",
        "/events/beach/2.jpg",
        "/events/beach/3.jpg",
      ];
      break;
    case "Hill Stations & Scenic Stays":
      images = [
        "/events/hill/1.jpg",
        "/events/hill/2.jpg",
        "/events/hill/3.jpg",
      ];
      break;
    case "Cultural & Temple Trails":
      images = [
        "/events/culture/1.jpg",
        "/events/culture/2.jpg",
        "/events/culture/3.jpg",
      ];
      break;
    case "City Heritage & Food Walks":
      images = [
        "/events/heritage/1.jpg",
        "/events/heritage/2.jpg",
        "/events/heritage/3.jpg",
      ];
      break;
    case "Nightlife & Social Meetups":
      images = [
        "/events/nightlife/1.jpg",
        "/events/nightlife/2.jpg",
        "/events/nightlife/3.jpg",
      ];
      break;
    case "Food & Coffee Trails":
      images = [
        "/events/coffee/1.jpg",
        "/events/coffee/2.jpg",
        "/events/coffee/3.jpg",
      ];
      break;
    case "Wellness & Yoga Retreats":
      images = [
        "/events/yoga/1.jpg",
        "/events/yoga/2.jpg",
        "/events/yoga/3.jpg",
      ];
      break;
    case "Bike Rides & Road Trips":
      images = [
        "/events/bike/1.jpg",
        "/events/bike/2.jpg",
        "/events/bike/3.jpg",
      ];
      break;
    case "Offbeat & Hidden Escapes":
      images = [
        "/events/offbeat/1.jpg",
        "/events/offbeat/2.jpg",
        "/events/offbeat/3.jpg",
      ];
      break;
    case "Women-Only Trips":
      images = [
        "/events/women/1.jpg",
        "/events/women/2.jpg",
        "/events/women/3.jpg",
      ];
      break;
    case "Solo-Friendly Group Trips":
      images = [
        "/events/solo/1.jpg",
        "/events/solo/2.jpg",
        "/events/solo/3.jpg",
      ];
      break;
    case "Create Your Own Scene (Other)":
      images = [
        "/events/other/1.jpg",
        "/events/other/2.jpg",
        "/events/other/3.jpg",
      ];
      break;
    default:
      images = ["/event/hikinh.webp"];
      break;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

export default getCategoryImage;
