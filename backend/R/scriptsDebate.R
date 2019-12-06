tweets_anaya <- read.csv("debate/debatePresidencial2018_anaya_evaluado.csv")
tweets_amlo <- read.csv("debate/debatePresidencial2018_amlo_evaluado.csv")
tweets_meade <- read.csv("debate/debatePresidencial2018_meade_evaluado.csv")

tweets_anaya$evaluation[tweets_anaya$evaluation == 0] <- 'Negativo'
tweets_anaya$evaluation[tweets_anaya$evaluation == 1] <- 'Positivo'

tweets_amlo$evaluation[tweets_amlo$evaluation == 0] <- 'Negativo'
tweets_amlo$evaluation[tweets_amlo$evaluation == 1] <- 'Positivo'

tweets_meade$evaluation[tweets_meade$evaluation == 0] <- 'Negativo'
tweets_meade$evaluation[tweets_meade$evaluation == 1] <- 'Positivo'

#plot(as.factor(tweets_anaya$evaluation))
#title(main = "Debate Presidencial 2018 Anaya")

#plot(as.factor(tweets_amlo$evaluation))
#title(main = "Debate Presidencial 2018 AMLO")

#plot(as.factor(tweets_meade$evaluation))
#title(main = "Debate Presidencial 2018 Meade")

# Convertir en tiempo la fecha
tweets_anaya$created_at <- as.POSIXct(tweets_anaya$created_at)
tweets_amlo$created_at <- as.POSIXct(tweets_amlo$created_at)
tweets_meade$created_at <- as.POSIXct(tweets_meade$created_at)

# Tomar 5 minutos y 5 minutos despues de cada tema para obtener mencioens quie probablemente ayuden

# Ricardo Anaya
tweets_anaya_primer_tema <- with(tweets_anaya, tweets_anaya[(created_at >= "2018-04-22 07:55:00" & created_at <= "2018-04-22 08:30:00"), ])
tweets_anaya_segundo_tema <- with(tweets_anaya, tweets_anaya[(created_at >= "2018-04-22 08:37:00" & created_at <= "2018-04-22 09:10:00"), ])
tweets_anaya_tercer_tema <- with(tweets_anaya, tweets_anaya[(created_at >= "2018-04-22 09:16:28" & created_at <= "2018-04-22 09:48:00"), ] )

ggplot(tweets_anaya, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Ricardo Anaya General")
ggplot(tweets_anaya_primer_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Ricardo Anaya Primer Tema")
ggplot(tweets_anaya_segundo_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Ricardo Anaya Segundo Tema")
ggplot(tweets_anaya_tercer_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Ricardo Anaya Tercer Tema")

# Meade
tweets_meade_primer_tema <- with(tweets_meade, tweets_meade[(created_at >= "2018-04-22 07:55:00" & created_at <= "2018-04-22 08:30:00"), ])
tweets_meade_segundo_tema <- with(tweets_meade, tweets_meade[(created_at >= "2018-04-22 08:37:00" & created_at <= "2018-04-22 09:10:00"), ])
tweets_meade_tercer_tema <- with(tweets_meade, tweets_meade[(created_at >= "2018-04-22 09:16:28" & created_at <= "2018-04-22 09:48:00"), ] )

ggplot(tweets_meade, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Meade General")
ggplot(tweets_meade_primer_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Meade Primer Tema")
ggplot(tweets_meade_segundo_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Meade Segundo Tema")
ggplot(tweets_meade_tercer_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Meade Tercer Tema")

# Amlo
tweets_amlo_primer_tema <- with(tweets_amlo, tweets_amlo[(created_at >= "2018-04-22 07:55:00" & created_at <= "2018-04-22 08:30:00"), ])
tweets_amlo_segundo_tema <- with(tweets_amlo, tweets_amlo[(created_at >= "2018-04-22 08:37:00" & created_at <= "2018-04-22 09:10:00"), ])
tweets_amlo_tercer_tema <- with(tweets_amlo, tweets_amlo[(created_at >= "2018-04-22 09:16:28" & created_at <= "2018-04-22 09:48:00"), ] )

ggplot(tweets_amlo, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Amlo General")
ggplot(tweets_amlo_primer_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Amlo Primer Tema")
ggplot(tweets_amlo_segundo_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Amlo Segundo Tema")
ggplot(tweets_amlo_tercer_tema, aes(x = evaluation, fill = evaluation)) + geom_bar() + ggtitle("Menciones Amlo Tercer Tema")
