function getCategoryImage(category) {
  let images = [];

  switch (category) {
    case "Music & Concerts":
      images = [
        "/event/music/1.png",
        "/event/music/2.png",
        "/event/music/3.png",
        "/event/music/4.png",
      ];
      break;
    case "Sports & Fitness":
      images = [
        "/event/sports/1.png",
        "/event/sports/2.png",
        "/event/sports/3.png",
        "/event/sports/4.png",
      ];
      break;
    case "Arts & Culture":
      images = [
        "/event/art/1.png",
        "/event/art/2.png",
        "/event/art/3.png",
        "/event/art/4.png",
      ];
      break;
    case "Movies & Entertainment":
      images = [
        "/event/movie/1.png",
        "/event/movie/2.png",
        "/event/movie/3.png",
        "/event/movie/4.png",
      ];
      break;
    case "Social & Networking":
      images = [
        "/event/social/1.png",
        "/event/social/2.png",
        "/event/social/3.png",
        "/event/social/4.png",
      ];
      break;
    case "Food & Drink":
      images = [
        "/event/food/1.png",
        "/event/food/2.png",
        "/event/food/3.png",
        "/event/food/4.png",
      ];
      break;
    case "Education & Workshops":
      images = [
        "/event/ed/1.png",
        "/event/ed/2.png",
        "/event/ed/3.png",
        "/event/ed/4.png",
      ];
      break;
    case "Wellness & Spirituality":
      images = [
        "/event/wellness/1.png",
        "/event/wellness/2.png",
        "/event/wellness/3.png",
        "/event/wellness/4.png",
      ];
      break;
    case "Business & Tech":
      images = [
        "/event/business/1.png",
        "/event/business/2.png",
        "/event/business/3.png",
        "/event/business/4.png",
      ];
      break;
    case "Family & Kids":
      images = [
        "/event/family/1.png",
        "/event/family/2.png",
        "/event/family/4.png",
        "/event/family/3.png",
      ];
      break;
    case "Outdoor & Adventure":
      images = [
        "/event/outdoor/1.png",
        "/event/outdoor/2.png",
        "/event/outdoor/3.png",
        "/event/outdoor/4.png",
      ];
      break;
    case "Gaming & Esports":
      images = [
        "/event/gaming/1.png",
        "/event/gaming/2.png",
        "/event/gaming/3.png",
        "/event/gaming/4.png",
      ];
      break;
    case "Volunteer & Causes":
      images = [
        "/event/vol/1.png",
        "/event/vol/2.png",
        "/event/vol/3.png",
        "/event/vol/4.png",
      ];
      break;
    case "Festivals & Celebrations":
      images = [
        "/event/celeb/1.png",
        "/event/celeb/2.png",
        "/event/celeb/3.png",
        "/event/celeb/4.png",
      ];
      break;
    case "Local & Community Events":
      images = [
        "/event/local/1.png",
        "/event/local/2.png",
        "/event/local/3.png",
        "/event/local/4.png",
      ];
      break;
    case "Other":
      images = [
        "/event/other/1.png",
        "/event/other/2.png",
        "/event/other/4.png",
        "/event/other/3.png",
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
