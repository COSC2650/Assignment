namespace API.GraphQL.Listings
{
    public record AddListingInput(
        int UserID,
        int ListingPostCode,
        string ListingTitle,
        string ListingCategory,
        float ListingPrice,
        string ListingType,
        string ListingDescription,
        string ListingCondition,
        string ListingImageURL
        );
}