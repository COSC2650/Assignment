namespace API.GraphQL.Listings
{
    public record AddListingInput(
        int UserID,
        int PostCode,
        string Title,
        string Category,
        float Price,
        string ListingType,
        string Description,
        string ProdCondition,
        string ImageURL
        );
}