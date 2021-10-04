import { GraphQLClient } from "graphql-request";

export const graphCmsClient = new GraphQLClient(process.env.GRAPH_CMS_CONTENT_API);

export function getQueryString(queries, locale) {
  let { city, type, rooms, price_low, price_high, page } = queries;
  const start = Number(page) * 11;
  const stop = start - 11;
  if (city === "" && type === "" && rooms === "" && price_low === "" && price_high === "") return `flats(first: ${start},skip: ${stop},locales: ${locale},orderBy: publishedAt_DESC)`;
  const cityQuery = city === "" ? "" : `location_in: ${city}`;
  const typeQuery = type === "" ? "" : `listingType_in: ${type},`;
  const roomsQuery = rooms === "" ? "" : `rooms: ${rooms},`;
  const priceLowQuery = price_low === "" ? "" : `price_gte: ${price_low},`;
  const priceHighQuery = price_high === "" ? "" : `price_lte: ${price_high}`;
  let formatedQuery = `flats(where: { ${cityQuery} ${typeQuery} ${roomsQuery} ${priceLowQuery} ${priceHighQuery} }first: ${start},skip: ${stop},locales: ${locale},orderBy: publishedAt_DESC)`;
  return formatedQuery;
}

export const getSearchedFlatsQuery = (queryString) => {
  return `{
        ${queryString} {
          id
          location
          pictures(first: 1, locales: en) {
            id
            url(transformation: {image: {resize: {fit: clip, height: 200, width: 300}}})
            width
            height
          }
          price
          size
          title
          address
          referenceNumber
        }
      }`;
};

export const getFlatDataQuery = (refNumber, locale) => {
  return `
{
  flat(where: {referenceNumber: ${refNumber}}locales: ${locale}) {
    address
    availableFrom
    contractLength
    createdAt
    description
    floors
    heating
    livingRooms
    listingType
    locale
    location
    pictures(locales: en) {
      id
      url
      width
      height
    }
    price
    publishedAt
    referenceNumber
    rooms
    size
    title
    type
    airConditioner
    balcony
    commuityFee
    pets
    shutter
    garage
    elevetor
    plasticDoorsAndWindows
  }
}
`;
};

export const getLatestFlatsQuery = (locale) => {
  return `
    {
      flats(orderBy: createdAt_DESC, first: 10,locales: ${locale}) {
        id
        pictures(locales: en) {
          url(transformation: {image: {resize: {fit: crop, height: 200, width: 300}}})
          width
          height
        }
        price
        size
        rooms
        address
        referenceNumber
        title
      }
    }
  `;
};

export const getAllInfos = (locale) => {
  return `
  {
    infos(locales: ${locale}) {
      coverPhoto(locales: en) {
        url(transformation: {image: {resize: {fit: crop, height: 200, width: 300}}})
        width
        height
      }
      title
      slug
      subtitle
    }
  }`;
};

export const getInfo = (locale, slug) => {
  return `
  {
    info(where: {slug: "${slug}"}, locales: ${locale}) {
      coverPhoto(locales: en) {
        height
        url(transformation: {image: {resize: {fit: clip, height: 200, width: 300}}})
        width
      }
      subtitle
      title
      body {
        raw
      }
    }
  }`;
};
