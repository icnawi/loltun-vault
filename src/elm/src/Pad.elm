module Pad exposing (..)

import Html exposing (Html, button, text)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type Color
    = Green
    | Red
    | Blue
    | Yellow


type Animal
    = Turtle
    | Octopus
    | Jellyfish
    | Blowfish


type EmojiAnimal
    = EmojiTurtle
    | EmojiOctopus
    | EmojiJellyfish
    | EmojiBlowfish


type Note
    = G3
    | C4
    | E4
    | G4


type alias Pad =
    { id : Maybe String
    , name : Maybe String
    , color : Maybe Color
    , emoji : Maybe EmojiAnimal
    , note : Maybe Note
    }


type Msg
    = Click Animal


padItem : Pad -> Html Msg
padItem pad =
    button [ onClick Click ] [ text pad.emoji ]
