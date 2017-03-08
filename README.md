# cheer-favor-learning

## Recommendation Engine Components

### Jaccard Coefficient for Similarity

There are many ways to gauge the likeness of two users. The original implementation of recommendation Raccoon used the Pearson Coefficient which was good for measuring discrete values in a small range (i.e. 1-5 stars). However, to optimize for quicker calcuations and a simplier interface, recommendation Raccoon instead uses the Jaccard Coefficient which is useful for measuring binary rating data (i.e. like/dislike). Many top companies have gone this route such as Youtube because users were primarily rating things 4-5 or 1. The choice to use the Jaccard's instead of Pearson's was largely inspired by David Celis who designed Recommendable, the top recommendation engine on Rails. The Jaccard Coefficient also pairs very well with Redis which is able to union/diff sets of like/dislikes at O(N).

### K-Nearest Neighbors Algorithm for Recommendations

To deal with large user bases, it's essential to make optimizations that don't involve comparing every user against every other user. One way to deal with this is using the K-Nearest Neighbors algorithm which allows you to only compare a user against their 'nearest' neighbors. After a user's similarity is calculated with the Jaccard Coefficient, a sorted set is created which represents how similar that user is to every other. The top users from that list are considered their nearest neighbors. recommendation Raccoon uses a default value of 5, but this can easily be changed based on your needs.

### Wilson Score Confidence Interval for a Bernoulli Parameter

If you've ever been to Amazon or another site with tons of reviews, you've probably ran into a sorted page of top ratings only to find some of the top items have only one review. The Wilson Score Interval at 95% calculates the chance that the 'real' fraction of positive ratings is at least x. This allows for you to leave off the items/products that have not been rated enough or have an abnormally high ratio. It's a great proxy for a 'best rated' list.