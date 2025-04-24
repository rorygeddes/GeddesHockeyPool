#!/bin/bash

# Create the team-logos directory if it doesn't exist
mkdir -p public/team-logos

# Download logos for each team
download_team_logo() {
  local abbr=$1
  local abbr_lower=$(echo "$abbr" | tr '[:upper:]' '[:lower:]')
  echo "Downloading logo for $abbr..."
  curl -s "https://assets.nhle.com/logos/nhl/svg/${abbr}_light.svg" \
    -o "public/team-logos/${abbr_lower}.svg"
  
  # Convert SVG to PNG using sips (built into macOS)
  sips -s format png "public/team-logos/${abbr_lower}.svg" --out "public/team-logos/${abbr_lower}.png" >/dev/null 2>&1
  rm "public/team-logos/${abbr_lower}.svg"
}

# Download each team logo
download_team_logo "FLA"  # Florida Panthers
download_team_logo "VGK"  # Vegas Golden Knights
download_team_logo "STL"  # St. Louis Blues
download_team_logo "WSH"  # Washington Capitals
download_team_logo "PIT"  # Pittsburgh Penguins

echo "Logo download complete!" 