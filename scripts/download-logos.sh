#!/bin/bash

# Create the team-logos directory if it doesn't exist
mkdir -p public/team-logos

# Function to download and save logo
download_logo() {
  local team=$1
  local url=$2
  curl -L "$url" -o "public/team-logos/$team.png"
}

# Download logos from NHL Stats API
download_logo "toronto" "https://records.nhl.com/site/asset/public/images/team-logos/toronto-maple-leafs.svg"
download_logo "ottawa" "https://records.nhl.com/site/asset/public/images/team-logos/ottawa-senators.svg"
download_logo "tampa-bay" "https://records.nhl.com/site/asset/public/images/team-logos/tampa-bay-lightning.svg"
download_logo "florida" "https://records.nhl.com/site/asset/public/images/team-logos/florida-panthers.svg"
download_logo "washington" "https://records.nhl.com/site/asset/public/images/team-logos/washington-capitals.svg"
download_logo "montreal" "https://records.nhl.com/site/asset/public/images/team-logos/montreal-canadiens.svg"
download_logo "carolina" "https://records.nhl.com/site/asset/public/images/team-logos/carolina-hurricanes.svg"
download_logo "new-jersey" "https://records.nhl.com/site/asset/public/images/team-logos/new-jersey-devils.svg"
download_logo "winnipeg" "https://records.nhl.com/site/asset/public/images/team-logos/winnipeg-jets.svg"
download_logo "st-louis" "https://records.nhl.com/site/asset/public/images/team-logos/st-louis-blues.svg"
download_logo "dallas" "https://records.nhl.com/site/asset/public/images/team-logos/dallas-stars.svg"
download_logo "colorado" "https://records.nhl.com/site/asset/public/images/team-logos/colorado-avalanche.svg"
download_logo "vegas" "https://records.nhl.com/site/asset/public/images/team-logos/vegas-golden-knights.svg"
download_logo "minnesota" "https://records.nhl.com/site/asset/public/images/team-logos/minnesota-wild.svg"
download_logo "los-angeles" "https://records.nhl.com/site/asset/public/images/team-logos/los-angeles-kings.svg"
download_logo "edmonton" "https://records.nhl.com/site/asset/public/images/team-logos/edmonton-oilers.svg" 