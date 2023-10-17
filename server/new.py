from apify_client import ApifyClient

# Initialize the ApifyClient with your API token
client = ApifyClient("apify_api_LYREnKRhobR6UIc9hiU2M2q01tpjvq0GZ1aU")

# Prepare the Actor input
run_input = {
    "startUrls": [
        { "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwYEPJJrNJmYhgVPA32KOIM-4LIB5EEltqEZ4m74fV&s" },
 
    ],
    "proxy": { "useApifyProxy": True },
    "maxRequestRetries": 10,
    "debugLog": False,
}

# Run the Actor and wait for it to finish
run = client.actor("RA7fg2mqciGjZM7hM").call(run_input=run_input)

# Fetch and print Actor results from the run's dataset (if there are any)
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item["ocrText"])
