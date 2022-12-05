# main game:
    # draw the pieces.
    # decide who goes first.
        # see who has the biggest mirrored piece. 
            # the one that has the biggest mirrored-piece.
        # if no one has mirrored piece, then see who has the summed-mirrored piece, and has play that piece.
            # the one that has the biggest summed-mirrored piece, and has play that piece.
    # then cycle through the turn order of play.
    # if a player cannot play a piece he auto buys from the shop until he can get a piece he can play or the shop runs out of pieces.

# variable playable[left] & playable[right] class piece: [Done!]
    0 = can't play
    1 = can play
    2 = can play, but needs rotation.

# Method print_hand on Class Player: [Done!]
    print on console all pieces in the player hand.

# Variable can_play on Class Player: [...]
    ...

# method update_playable class Player: [...]
    # update the playable_left & playable_right variables of every piece in the hand of the player all pieces in the player.

# Method update_playable Class Piece: [...]


# Shop Class:
    has a array arr that serves to draw pieces.

current_player
change_player


draw 7
decide_first
alternate