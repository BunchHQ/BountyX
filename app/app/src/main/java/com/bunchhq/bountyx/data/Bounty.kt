package com.bunchhq.bountyx.data

import android.os.Build
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.time.LocalTime
import java.time.ZoneOffset


enum class Item {
    // books, copies, pen pencils etc
    STATIONERY,

    // Medicine
    MEDICINE,

    // Fast food
    FOOD,

    // Movie tickets, railway tickets
    TICKETS,

    // Drinking Water
    PURIFIED_WATER,

    // Fruits/Vegetables
    GROCERY,

    // Auto
    TRANSPORT,

    // Other
    OTHER,
}

enum class BountyStatus {
    // Just offered, open for claims
    OFFERED,

    // Claimed by someone
    CLAIMED,

    // Marked completed by poster, Bounty done
    COMPLETED,

    // Cancelled by poster or expired
    CANCELLED,
}

data class Bounty(
    val id: String,
    val item: Item,
    val details: String,
    val reward: Int,
    val destination: String,
    val deadline: Int,
    val status: BountyStatus,
    val poster: String,
    val claimer: String?,
    val claimedAt: Long?,
    val createdAt: Long

)

@RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
fun dummyBounty(): Bounty {
    return Bounty(
        id = "1",
        item = Item.STATIONERY,
        details = "Copy",
        reward = 10,
        destination = "Room",
        deadline = 500,
        status = BountyStatus.OFFERED,
        poster = "Me",
        claimer = "You",
        claimedAt = null,
        createdAt = LocalDate.now().toEpochSecond(LocalTime.now(), ZoneOffset.UTC)
    )
}

@RequiresApi(Build.VERSION_CODES.UPSIDE_DOWN_CAKE)
fun dummyBounties(): List<Bounty> {
    return listOf<Bounty>(
        Bounty(
            id = "1",
            item = Item.STATIONERY,
            details = "Copy",
            reward = 10,
            destination = "Room",
            deadline = 500,
            status = BountyStatus.OFFERED,
            poster = "Me",
            claimer = "You",
            claimedAt = null,
            createdAt = LocalDate.now().toEpochSecond(LocalTime.now(), ZoneOffset.UTC)
        ),
        Bounty(
            id = "2",
            item = Item.MEDICINE,
            details = "Dawai",
            reward = 50,
            destination = "Room",
            deadline = 100,
            status = BountyStatus.CLAIMED,
            poster = "You",
            claimer = "Me",
            claimedAt = LocalDate.now().toEpochSecond(LocalTime.now(), ZoneOffset.UTC),
            createdAt = LocalDate.now().minusDays(5).toEpochSecond(LocalTime.now(), ZoneOffset.UTC)
        )
    )
}
