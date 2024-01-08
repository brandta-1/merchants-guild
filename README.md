
# traders-guild
Repository for my [Dark and Darker](https://www.darkanddarker.com/) trading site

## Deployment
The live site is currrently available [here](https://traders-guild-a1de141fdce9.herokuapp.com/).
MongoDB Atlas does not allow server-side JavaScript on their free clusters<sup>[[1](https://github.com/brandta-1/merchants-guild/blob/main/server/controller/listing-controller.js#L152)][[2](https://www.mongodb.com/docs/atlas/reference/free-shared-limitations/)]</sup>. This required parts of the back-end to be refactored, I have decided to take this opportunity to rewrite the site using React Native and ApolloGQL. The [new version](https://github.com/brandta-1/merchants-guild-native) of the site is live [here](https://peaceful-citadel-67422-36a5c387efe8.herokuapp.com/).

## Preview
Navigate to the Create Listings page, and enter the items you'd like to trade, and the name of your character that owns those items.
![image](https://github.com/brandta-1/merchants-guild/assets/116298512/95b06ce2-c53d-4c18-a57e-bf77864252f6)
On the Search Listings page, you can use a similar form to find characters buying and selling items you want
![image](https://github.com/brandta-1/merchants-guild/assets/116298512/62746857-fcef-4648-8b4e-e5a99ede8c37)
The search results are displayed below, ordered by closest match, custom filtering and sorting will be added.
![image](https://github.com/brandta-1/merchants-guild/assets/116298512/56aeea94-b48e-4353-a1b5-dd11a506784a)

