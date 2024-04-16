import pandas as pd

# Load the original dataset
df = pd.read_csv('goodreads_books.csv')

# List of unnecessary columns to be removed
columns_to_remove = ['author_link', 'five_star_ratings', 'four_star_ratings', 'three_star_ratings', 'two_star_ratings',
                     'one_star_ratings', 'date_published', 'publisher', 'original_title', 'isbn13', 'asin', 'settings',
                     'characters', 'awards', 'amazon_redirect_link', 'worldcat_redirect_link', 'recommended_books']

# Drop unnecessary columns
df.drop(columns=columns_to_remove, inplace=True)

# Drop rows with missing values in the 'features' column
df.dropna(inplace=True)

# Save the sampled dataset to a new file
df.to_csv("goodreads.csv", index=False)

