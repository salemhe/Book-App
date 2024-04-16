import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Load the dataset
data = pd.read_csv('goodreads.csv')

# Preprocess the data
# For simplicity, let's consider only the 'title', 'author', and 'genre_and_votes' columns
data['features'] = data['title'] + ' ' + data['author'] + ' ' + data['genre_and_votes']

# Drop rows with missing values in the 'features' column
data.dropna(subset=['features'], inplace=True)

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(data['features'])

# Compute similarity scores
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)


# Function to get recommendations based on a search word
def get_recommendations_by_word(search_word, cosine_sim=cosine_sim):
    # Transform the search word into a TF-IDF vector
    search_vector = tfidf_vectorizer.transform([search_word])

    # Compute similarity scores between the search word and all books
    cosine_similarities = linear_kernel(search_vector, tfidf_matrix).flatten()

    # Get indices of books with the highest similarity scores
    sim_scores_indices = cosine_similarities.argsort()[::-1]

    # Get top 10 similar books with titles, image links, and descriptions
    similar_books = data.iloc[sim_scores_indices[:10]][['title', 'link', 'cover_link', 'author', 'rating_count',
                                                        'review_count', 'average_rating', 'number_of_pages',
                                                        'genre_and_votes', 'books_in_series', 'description']]
    return similar_books


# Example usage
search_word = "Friends"  # Example search word
similar_books = get_recommendations_by_word(search_word)
print("Books similar to", search_word, ":")
print(similar_books)
