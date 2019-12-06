tweets_anaya <- read.csv("RicardoAnayaC_tweets_text_with_favs.txt")
tweets_anaya$X0 <- as.numeric(tweets_anaya$X0)
tweets_anaya <- tweets_anaya[!(tweets_anaya$X0 == 0),]

tweets_meade <- read.csv("JoseAMeadeK_tweets_text_with_favs.txt")
tweets_meade$X0 <- as.numeric(tweets_meade$X0)
tweets_meade <- tweets_meade[!(tweets_meade$X0 == 0),]

tweets_obrador <- read.csv("lopezobrador_tweets_text_with_favs.txt")
tweets_obrador$X0 <- as.numeric(tweets_obrador$X0)
tweets_obrador <- tweets_obrador[!(tweets_obrador$X0 == 0),]

#Plot
p_anaya <- plot_ly(tweets_anaya, x = ~X0)
p_obrador <- plot_ly(tweets_obrador, x = ~X0)
p_meade <- plot_ly(tweets_meade, x = ~X0)

## Getting positive mentions
anaya_mentions <-  read.csv("debatePresidencial2018_anaya_evaluado.csv")
result <- anaya_mentions[anaya_mentions$evaluation == "1",]
write.csv(result, file = "positive_mentions_anaya.csv")

meade_mentions <-  read.csv("debatePresidencial2018_meade_evaluado.csv")
result_meade <- meade_mentions[meade_mentions$evaluation == "1",]
write.csv(result_meade, file = "positive_mentions_meade.csv")

amlo_mentions <-  read.csv("debatePresidencial2018_amlo_evaluado.csv")
result_amlo <- amlo_mentions[amlo_mentions$evaluation == "1",]
write.csv(result_amlo, file = "positive_mentions_amlo.csv")
