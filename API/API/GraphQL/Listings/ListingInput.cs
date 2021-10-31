namespace API.GraphQL.Listings
{
    public record AddListingInput(
        int UserID,
        int PostCode,
        string Title,
        DateTime DateListed,
        string Category,
        Decimal Price,
        string ListingType,
        string Description,
        string ProdCondition,
        DateTime ServAvailability,
        string ImageURL
        );
}