/** @format */
import { useEffect, useState } from "react";

import { Box, Select, MenuItem, Typography } from "@mui/material";

export default function ChatFilter({ allChats, filterChats }) {
  const [ratings, setRatings] = useState("All Ratings");

  const handleChange = (e) => {
    setRatings(e.target.value);
  };

  // FILTER CHATS
  useEffect(() => {
    if (ratings == "All Ratings") {
      filterChats(allChats);
    } else {
      const filtered = allChats.filter((item) => {
        let findValue = false;

        item.chat.forEach((ch) => {
          if (ch.rating == ratings) {
            findValue = true;
          }
        });

        return findValue;
      });

      filterChats(filtered);
    }
  }, [ratings]);

  return (
    <Box mb={3}>
      <Typography fontSize={12} mb={0.5}>
        Filters by rating
      </Typography>
      <Select
        value={ratings}
        onChange={handleChange}
        size="small"
        sx={{
          minWidth: { xs: 1, md: 150 },
        }}
      >
        <MenuItem value="All Ratings">All Ratings</MenuItem>
        <MenuItem value={1}>1  Star</MenuItem>
        <MenuItem value={2}>2  Stars</MenuItem>
        <MenuItem value={3}>3  Stars</MenuItem>
        <MenuItem value={4}>4  Stars</MenuItem>
        <MenuItem value={5}>5  Stars</MenuItem>
      </Select>
    </Box>
  );
}
