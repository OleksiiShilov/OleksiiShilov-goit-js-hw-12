import axios from 'axios';

export async function getSearchImage(queryImage, page = 1) {
  const params = new URLSearchParams({
    key: '44116350-6386c211d371838e745950ec7',
    q: queryImage,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15, // Встановлюємо кількість об'єктів на сторінку 15
  });

  try {
    const response = await axios.get('https://pixabay.com/api/', { params });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
