import axios from "axios";
import * as cheerio from 'cheerio';

export async function fetchClassQuota(): Promise<any> {
  const url = "https://w5.ab.ust.hk/wcq/cgi-bin/2410/subject/ACCT";
  try {
    const response = await axios.get(url, {
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);
    console.log("Response Data Length:", response.data.length);

    if (!response.data) {
      console.error("Empty response received");
      return [];
    }

    const $ = cheerio.load(response.data);
    const quotaData: Array<{ classCode: string; quota: number }> = [];

    // Limit to the first 10 course elements to manage data volume
    $(".courseinfo .course").slice(0, 10).each((index, element) => {
        const classCode = $(element).find(".subject").text().trim();
        console.log(`Class Code Found: ${classCode}`); // Log each class code found

        $(element).find("table.sections tr.newsect").each((_, sectElement) => {
            const quotaText = $(sectElement).find('td[align="center"]').first().text().trim();
            console.log(`Quota Text Found: ${quotaText}`); // Log each quota text found

            const quota = parseInt(quotaText);
            if (classCode && !isNaN(quota)) {
                quotaData.push({ classCode, quota });
            } else {
                console.warn(`Invalid data for classCode: ${classCode}, quotaText: ${quotaText}`);
            }
        });
    });

    console.log("Quota data:", quotaData);
    return quotaData;
  } catch (error) {
    console.error("Error fetching class quota:", error);
    throw error;
  }
}