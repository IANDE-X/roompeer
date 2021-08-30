import { GraphQLClient } from "graphql-request";

export const graphCmsClient = new GraphQLClient(process.env.GRAPH_CMS_CONTENT_API);

export function getQueryString(queries, locale) {
  let { city, type, rooms, price_low, price_high } = queries;
  if (city === "" && type === "" && rooms === "" && price_low === "" && price_high === "") return `flats(locales: ${locale})`;
  let formatedQuery = `flats(where: {${city === "" ? "" : `location_in: ${city},`} ${type === "" ? `` : `listingType_in: ${type},`} ${rooms === "" ? "" : `rooms: ${rooms},`} ${price_low === "" ? "" : `price_gte: ${price_low},`} ${
    price_high === "" ? "" : `price_lte: ${price_high}},locales: ${locale}`
  })`;
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
          url(transformation: {image: {resize: {fit: clip, height: 200, width: 300}}})
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
