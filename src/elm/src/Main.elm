module Main exposing (..)

import Array exposing (Array)
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Maybe
import Pad exposing (Pad(..))
import Platform.Cmd exposing (batch)
import Process
import Random
import Task
import Time
import Utils exposing (randomSeq)



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }



-- MODEL


type GamePhase
    = Watch
    | Repeat


type Msg
    = NewGame (Array Pad.Pad)
    | Next
    | Wait
    | Done Int
    | Click Pad.Pad
    | NextPad Pad.Pad
    | GameOver


type alias Model =
    { sequence : Array String
    , pad : Pad.Pad
    , padIndex : Int
    , phase : GamePhase
    , level : Int
    }


init : ( Model, Cmd Msg )
init =
    ( { sequence = Array.empty
      , pad = { id = Nothing, color = Nothing, name = Nothing, emoji = Nothing, note = Nothing }
      , padIndex = 0
      , phase = Watch
      , level = 0
      }
    , batch [ Cmd.none, Random.generate NewGame (randomSeq 1) ]
    )


-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Roll ->
            ( model, Random.generate NewFace (Random.int 1 6) )

        NewFace newFace ->
            ( Model newFace, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text (String.fromInt model.dieFace) ]
        , button [ onClick Roll ] [ text "Roll" ]
        ]
